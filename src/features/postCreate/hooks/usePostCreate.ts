import { useMutation } from "@tanstack/react-query";
import { postPost } from "../api/queries";
import PostDTO from "../types/postDTO";

export default function usePostCreate() {
  return useMutation({
    mutationFn: (post: PostDTO) => postPost(post),
    onSuccess: async () => {},
  });
}
