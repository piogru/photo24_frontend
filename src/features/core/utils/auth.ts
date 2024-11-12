import { replace } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import toaster from "../../notifications/utils/toaster";
import { currentUserQuery } from "../../accounts/api/queries";

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

  if (authStatus) {
    toaster.error({ title: "", text: "Already logged in." });
    throw replace("/");
  }

  return null;
};
