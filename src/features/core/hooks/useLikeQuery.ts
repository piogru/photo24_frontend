import { useQuery } from "@tanstack/react-query";
import { likeQuery } from "../api/queries";
import ObjectId from "../types/objectId";
import Like from "../types/like";

export default function useLikeQuery(postId: ObjectId, initialData?: Like) {
  return useQuery({ ...likeQuery(postId), initialData, enabled: !!postId });
}
