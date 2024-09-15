import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../posts/api/queries";

export default function useFollowingPostsQuery() {
  const query = () => ({
    queryKey: ["posts", "following"],
    retry: false,
    queryFn: async () => getAllPosts(),
  });

  return useQuery(query());
}
