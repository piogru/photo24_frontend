import { useQuery } from "@tanstack/react-query";
import { userPostsQuery } from "../api/queries";
import ObjectId from "../../core/types/objectId";
import Post from "../../posts/types/post";

export default function useUserPosts(userId: ObjectId, initialData?: Post[]) {
  return useQuery({
    ...userPostsQuery(userId),
    initialData,
    enabled: !!userId,
  });
}
