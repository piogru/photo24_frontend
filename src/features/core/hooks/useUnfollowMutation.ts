import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow } from "../api/queries";
import ObjectId from "../types/objectId";

export default function useUnfollowMutation(userId: ObjectId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", userId],
        exact: false,
      });
    },
  });
}
