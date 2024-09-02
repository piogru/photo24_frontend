import { QueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "../utils/auth";

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
