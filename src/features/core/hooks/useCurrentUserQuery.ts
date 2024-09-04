import { useQuery } from "@tanstack/react-query";
import { currentUserQuery } from "../utils/auth";

export default function useCurrentUserQuery() {
  return useQuery(currentUserQuery());
}
