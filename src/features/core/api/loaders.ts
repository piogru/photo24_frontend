import { QueryClient } from "@tanstack/react-query";
import { currentUserQuery } from "../../accounts/api/queries";

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
