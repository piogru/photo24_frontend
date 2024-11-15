import { useLoaderData } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postDetailsLoader } from "../api/loaders";
import { deleteLike, postLike } from "../api/queries";
import usePostLikeQuery from "../hooks/usePostLikeQuery";
import ObjectId from "../../core/types/objectId";
import IconButton from "../../core/components/IconButton";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

type PostReactionsProps = {
  postId: ObjectId;
};

export default function PostReactions({ postId }: PostReactionsProps) {
  const { like: initialLike } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof postDetailsLoader>>
  >;
  const queryClient = useQueryClient();
  const { data: like } = usePostLikeQuery(postId, initialLike || undefined);
  const likeMutation = useMutation({
    mutationFn: postLike,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
        exact: false,
      });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: deleteLike,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
        exact: false,
      });
    },
  });

  const onLikeClick = () => {
    if (like) {
      unlikeMutation.mutate(postId || "");
    } else {
      likeMutation.mutate(postId || "");
    }
  };

  const onCommentClick = () => {};

  const onShareClick = () => {};

  const onSaveClick = () => {};

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center gap-2">
        <IconButton
          Icon={HeartIcon}
          SolidIcon={HeartIconSolid}
          solid={!!like}
          title={like ? "Unlike" : "Like"}
          onClick={onLikeClick}
        />
        <IconButton
          disabled
          Icon={ChatBubbleOvalLeftIcon}
          title="Comment"
          onClick={onCommentClick}
        />
        <IconButton
          disabled
          Icon={ShareIcon}
          title="Share"
          onClick={onShareClick}
        />
      </div>
      <div>
        <IconButton
          disabled
          Icon={BookmarkIcon}
          SolidIcon={BookmarkIconSolid}
          solid={false}
          title="Save"
          onClick={onSaveClick}
        />
      </div>
    </div>
  );
}
