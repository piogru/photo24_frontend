import { useQuery } from "@tanstack/react-query";
import { recommendedUsersQuery } from "../../core/api/queries";

export default function useRecommendedUsersQuery() {
  return useQuery(recommendedUsersQuery());
}
