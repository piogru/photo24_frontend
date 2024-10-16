import { QueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "../utils/auth";
import { allPostsQuery } from "../../explore/api/queries";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
} from "react-router-dom";
import {
  followingPostsQuery,
  followQuery,
  forYouPostsQuery,
  likeQuery,
  postQuery,
  recommendedUsersQuery,
  userPostsQuery,
  usersByUsernameQuery,
} from "./queries";

const Paths = {
  postDetail: "/p/:postId",
  profileDetail: "/:username",
  profilePostsDetail: ":username",
  profileSavedDetail: "/:username/saved",
} as const;

interface PhotoLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.postDetail>>;
}

interface ProfileLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.profileDetail>>;
}

interface ProfilePostsLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.profilePostsDetail>>;
}

export const appLoader = (queryClient: QueryClient) => async () => {
  const query = currentUserQuery();
  return await queryClient
    .ensureQueryData(query)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });
};

export const feedLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const variant = new URL(request.url).searchParams.get("variant");
    const postsQuery =
      variant === "following" ? followingPostsQuery : forYouPostsQuery;

    const postsPromise = queryClient
      .ensureQueryData(postsQuery())
      .then((data) => {
        return data;
      })
      .catch(() => {
        return [];
      });

    const recUsersPromise = queryClient
      .ensureQueryData(recommendedUsersQuery())
      .then((data) => {
        return data;
      })
      .catch(() => {
        return [];
      });

    return Promise.all([recUsersPromise, postsPromise]).then((values) => {
      return { posts: values[0], userRecommendations: values[1] };
    });
  };

export const exploreLoader = (queryClient: QueryClient) => async () => {
  const query = allPostsQuery();
  return await queryClient
    .ensureQueryData(query)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });
};

export const postDetailsLoader =
  (queryClient: QueryClient) =>
  async ({ params }: PhotoLoaderArgs) => {
    if (!params.postId) {
      return {
        post: null,
        like: null,
        follow: null,
      };
    }

    const post = await queryClient
      .ensureQueryData(postQuery(params.postId))
      .then((data) => {
        return data;
      })
      .catch(() => {
        return null;
      });
    const like = await queryClient
      .ensureQueryData(likeQuery(params.postId))
      .then((data) => {
        return data;
      })
      .catch(() => {
        return null;
      });
    const follow =
      post?.user ?
        await queryClient
          .ensureQueryData(followQuery(post.user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          })
      : null;

    return { post, like, follow };
  };

export const profileLoader =
  (queryClient: QueryClient) =>
  async ({ params }: ProfileLoaderArgs) => {
    if (!params.username) {
      return { user: null, follow: null };
    }

    const user = await queryClient
      .ensureQueryData(usersByUsernameQuery(params.username))
      .then((data) => {
        return data[0];
      })
      .catch(() => {
        return null;
      });
    const follow =
      user ?
        await queryClient
          .ensureQueryData(followQuery(user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          })
      : null;

    return { user, follow };
  };

export const profilePostsLoader =
  (queryClient: QueryClient) =>
  async ({ params }: ProfilePostsLoaderArgs) => {
    if (!params.username) {
      return { user: null, posts: [] };
    }

    const user = await queryClient
      .ensureQueryData(usersByUsernameQuery(params.username))
      .then((data) => {
        return data[0];
      })
      .catch(() => {
        return null;
      });
    const posts =
      user ?
        await queryClient
          .ensureQueryData(userPostsQuery(user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          })
      : null;

    return { user, posts };
  };
