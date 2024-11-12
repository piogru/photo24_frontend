import { QueryClient } from "@tanstack/react-query";
import { allPostsQuery } from "./queries";

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
