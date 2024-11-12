import { useQuery } from "@tanstack/react-query";
import { postLikeQuery } from "../api/queries";
import ObjectId from "../../core/types/objectId";
import Like from "../../core/types/like";

export default function usePostLikeQuery(postId: ObjectId, initialData?: Like) {
  return useQuery({ ...postLikeQuery(postId), initialData, enabled: !!postId });
}
