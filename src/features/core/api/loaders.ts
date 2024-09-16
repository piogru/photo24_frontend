import { QueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "../utils/auth";
import { allPostsQuery } from "../../explore/api/queries";

export const appLoader = (queryClient: QueryClient) => async () => {
  const query = currentUserQuery();
  return queryClient
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
  return queryClient
    .ensureQueryData(query)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });
};
