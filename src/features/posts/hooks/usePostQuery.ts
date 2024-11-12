import { useQuery } from "@tanstack/react-query";
import { postQuery } from "../../core/api/queries";
import ObjectId from "../../core/types/objectId";
import Post from "../../core/types/post";

export default function usePostQuery(postId: ObjectId, initialData?: Post) {
  return useQuery({ ...postQuery(postId), initialData, enabled: !!postId });
}
