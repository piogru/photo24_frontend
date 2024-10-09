import { useQuery } from "@tanstack/react-query";
import { forYouPostsQuery } from "../../core/api/queries";

export default function useForYouPostsQuery() {
  return useQuery(forYouPostsQuery());
}
