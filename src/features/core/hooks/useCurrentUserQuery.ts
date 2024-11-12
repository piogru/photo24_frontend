import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "../../accounts/api/queries";

export default function useCurrentUserQuery() {
  return useQuery(currentUserQuery());
}
