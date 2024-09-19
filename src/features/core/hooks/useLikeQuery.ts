import { useQuery } from "@tanstack/react-query";
import { likeQuery } from "../api/queries";
import ObjectId from "../types/objectId";

export default function useLikeQuery(postId: ObjectId) {
  return useQuery(likeQuery(postId));
}
