import { useQuery } from "@tanstack/react-query";
import { allPostsQuery } from "../api/queries";

export default function useAllPostsQuery() {
  return useQuery(allPostsQuery());
}
