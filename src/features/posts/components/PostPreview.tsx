import { useMutation, useQueryClient } from "@tanstack/react-query";
import useLikeQuery from "../../core/hooks/useLikeQuery";
import { deleteLike, postLike } from "../../core/api/queries";
import UserBar from "../../core/components/UserBar";
import Post from "../../core/types/post";
import ShowMoreText from "../../core/components/ShowMoreText";
import IconButton from "../../core/components/IconButton";
import Timestamp from "../../core/components/Timestamp";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";

type PostProps = {
  post: Post;
};

export default function PostPreview({ post }: PostProps) {
  const queryClient = useQueryClient();
  const multiplePhotos = post.photos.length > 1;
  const { data: like } = useLikeQuery(post?._id || "");
  const likeMutation = useMutation({
    mutationFn: postLike,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts", post?._id],
        exact: false,
      });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: deleteLike,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts", post?._id],
        exact: false,
      });
    },
  });

  const onLikeClick = () => {
    if (like) {
      unlikeMutation.mutate(post?._id || "");
    } else {
      likeMutation.mutate(post?._id || "");
    }
  };

  const onCommentClick = () => {};

  const onShareClick = () => {};

  const onSaveClick = () => {};

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-1">
          <UserBar user={post?.user} followEnabled={false} />
          <span>{"•"}</span>
          <Timestamp date={post?.createdAt} fontSize="text-sm" />
        </div>
        <IconButton
          disabled
          title="More options"
          Icon={EllipsisHorizontalIcon}
        />
      </div>

      <div className="group relative">
        <img
          src={post.photos[0].url}
          className="w-full h-full rounded-md border border-slate-300 dark:border-slate-600"
        />
        {multiplePhotos ?
          <div className="absolute top-2 right-2 p-1 rounded-full bg-black/20">
            <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
          </div>
        : null}
      </div>
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

      <span>
        <span className="font-semibold">{post.likes}</span> likes
      </span>

      {post.caption?.length > 0 ?
        <div>
          <span className="inline mr-1 font-semibold">
            {post.user?.name || "user"}
          </span>
          <ShowMoreText text={post.caption} overflowLength={100} />
        </div>
      : null}
    </div>
  );
}
