import { Button } from "@headlessui/react";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import usePostDelete from "../hooks/usePostDelete";
import Modal from "../../core/components/Modal";
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
  const { data: currentUser } = useCurrentUserQuery();
  const deleteMutation = usePostDelete();

  const onDeleteClick = (post: Post) => {
    deleteMutation.mutate(post, {
      onSuccess: () => {
        onDelete();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-4 sm:w-96">
        <div className="flex w-full flex-col items-center">
          {post && currentUser?._id === post.user?._id ?
            <Button
              autoFocus
              onClick={() => onDeleteClick(post)}
              className="w-full border-t border-slate-300 py-3 font-semibold text-red-500
                dark:border-slate-600"
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
