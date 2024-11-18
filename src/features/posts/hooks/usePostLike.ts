import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../api/queries";
import ObjectId from "../../core/types/objectId";

export default function usePostLike(postId: ObjectId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLike(postId),
    onSuccess: async () => {
      return queryClient.invalidateQueries({
        queryKey: ["posts", postId],
        exact: false,
      });
    },
  });
}
