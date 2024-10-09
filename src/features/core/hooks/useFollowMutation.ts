import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFollow } from "../api/queries";
import ObjectId from "../types/objectId";

export default function useFollowMutation(userId: ObjectId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", userId],
        exact: false,
      });
    },
  });
}
