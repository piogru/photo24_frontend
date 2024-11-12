import { useQuery } from "@tanstack/react-query";
import { forYouPostsQuery } from "../api/queries";

export default function useForYouPostsQuery() {
  return useQuery(forYouPostsQuery());
}
