import { QueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "../utils/auth";
import { allPostsQuery } from "../../explore/api/queries";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";
import { followQuery, likeQuery, postQuery, userQuery } from "./queries";

const Paths = {
  postDetail: "/p/:postId",
  profileDetail: ":username",
} as const;

interface PhotoLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.postDetail>>;
}

interface ProfileLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.profileDetail>>;
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
      .ensureQueryData(userQuery(params.username))
      .then((data) => {
        return data;
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
