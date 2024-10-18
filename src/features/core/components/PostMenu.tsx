import { Button } from "@headlessui/react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../api/queries";
import useCurrentUserQuery from "../hooks/useCurrentUserQuery";
import Post from "../types/post";

type PostMenuProps = {
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function PostMenu({
  post,
  isOpen,
  onClose,
  onDelete,
}: PostMenuProps) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUserQuery();
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", post?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", post?.user?._id, "posts"],
      });
      onDelete();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-4 sm:w-96">
        <div className="flex w-full flex-col items-center">
          {post && currentUser?._id === post.user._id ?
            <Button
              autoFocus
              onClick={() => deleteMutation.mutate(post._id)}
              className="w-full border-t border-slate-300 py-3 font-semibold text-red-500 dark:border-slate-600"
            >
              Remove post
            </Button>
          : null}
          <Button
            onClick={onClose}
            className="w-full border-t border-slate-300 py-3 dark:border-slate-600"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
