import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { followingPostsQuery, forYouPostsQuery } from "../api/queries";
import { recommendedUsersQuery } from "./queries";

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
