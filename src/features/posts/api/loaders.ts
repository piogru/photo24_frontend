import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { allPostsQuery } from "../api/queries";
import { postQuery, postLikeQuery } from "./queries";
import { followQuery } from "../../core/api/queries";

interface PhotoLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.postDetail>>;
}

const Paths = {
  postDetail: "/p/:postId",
} as const;

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

    const likePromise = queryClient.ensureQueryData(
      postLikeQuery(params.postId),
    );
    const { post, follow } = await queryClient
      .ensureQueryData(postQuery(params.postId))
      .then(async (data) => {
        const follow = await queryClient
          .ensureQueryData(followQuery(data.user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          });
        return { post: data, follow };
      })
      .catch(() => {
        return { post: null, follow: null };
      });
    const like = await likePromise
      .then((data) => {
        return data;
      })
      .catch(() => {
        return null;
      });

    return { post, like, follow };
  };
