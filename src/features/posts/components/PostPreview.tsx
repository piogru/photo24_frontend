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
import { useState } from "react";
import PostMenu from "./PostMenu";
import LikeCount from "../../core/components/LikeCount";

type PostProps = {
  post: Post;
};

export default function PostPreview({ post }: PostProps) {
  const queryClient = useQueryClient();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const onPostMenuClick = () => {
    setMenuOpen(true);
  };

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

  const onPostDelete = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <PostMenu
        post={post}
        isOpen={menuOpen}
        onClose={onPostDelete}
        onDelete={onPostDelete}
      />

      <article className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between px-3 sm:px-0">
          <div className="flex flex-row items-center gap-1">
            <UserBar user={post?.user} followEnabled={false} />
            <span>{"•"}</span>
            <Timestamp date={post?.createdAt} fontSize="text-sm" />
          </div>
          <IconButton
            title="More options"
            Icon={EllipsisHorizontalIcon}
            onClick={onPostMenuClick}
          />
        </div>

        <div className="group relative">
          <img
            src={post.photos[0].url}
            className="h-full w-full rounded-md border border-slate-300 dark:border-slate-600"
          />
          {multiplePhotos ?
            <div className="absolute right-2 top-2 rounded-full bg-black/20 p-1">
              <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
            </div>
          : null}
        </div>

        <div className="flex flex-col gap-2 px-3 sm:px-0">
          <section className="flex flex-row justify-between">
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
          </section>
          <section>
            <LikeCount likes={post.likes} hideLikes={post.hideLikes} />
          </section>
          {post.caption?.length > 0 ?
            <section>
              <span className="mr-1 inline font-semibold">
                {post.user?.name || "user"}
              </span>
              <ShowMoreText text={post.caption} overflowLength={100} />
            </section>
          : null}
        </div>
      </article>
    </>
  );
}
