import { replace } from "react-router-dom";
import { getCurrentUser } from "../../accounts/api/queries";
import { QueryClient } from "@tanstack/react-query";

export const isAuthenticated = (queryClient: QueryClient) => async () => {
  const query = currentUserQuery();
  const authStatus = await queryClient
    .ensureQueryData(query)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (authStatus) throw replace("/");

  return null;
};

export const currentUserQuery = () => ({
  queryKey: ["auth", "me"],
  retry: false,
  queryFn: async () => getCurrentUser(),
});
