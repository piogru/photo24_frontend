import { useQuery } from "@tanstack/react-query";
import { followingPostsQuery } from "../../core/api/queries";

export default function useFollowingPostsQuery() {
  return useQuery(followingPostsQuery());
}
