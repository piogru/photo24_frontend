import { useQuery } from "@tanstack/react-query";
import { followQuery } from "../api/queries";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";

export default function useFollowQuery(
  targetId: ObjectId,
  initialData?: Follow,
) {
  return useQuery({
    ...followQuery(targetId),
    initialData,
    enabled: !!targetId,
    staleTime: 3 * 60 * 1000,
  });
}
