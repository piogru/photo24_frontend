import { useQuery } from "@tanstack/react-query";
import { postQuery } from "../api/queries";
import ObjectId from "../types/objectId";
import Post from "../types/post";

export default function usePostQuery(postId: ObjectId, initialData?: Post) {
  return useQuery({ ...postQuery(postId), initialData, enabled: !!postId });
}
