import { useQuery } from "@tanstack/react-query";
import { recommendedUsersQuery } from "../api/queries";

export default function useRecommendedUsersQuery() {
  return useQuery(recommendedUsersQuery());
}
