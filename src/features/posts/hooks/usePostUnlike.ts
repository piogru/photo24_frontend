import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../api/queries";
import ObjectId from "../../core/types/objectId";

export default function usePostUnlike(postId: ObjectId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLike(postId),
    onSuccess: async () => {
      return queryClient.invalidateQueries({
        queryKey: ["posts", postId],
        exact: false,
      });
    },
  });
}
