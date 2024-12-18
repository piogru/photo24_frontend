import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/queries";
import Post from "../types/post";

export default function usePostDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: Post) => deletePost(post._id),
    onSuccess: (_data, variables) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["posts", variables._id],
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: ["users", variables.user._id, "posts"],
        }),
      ]),
  });
}
