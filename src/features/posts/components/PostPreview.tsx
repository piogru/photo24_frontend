import UserBar from "./UserBar";
import Post from "..//types/post";
import ShowMoreText from "../../core/components/ShowMoreText";
import IconButton from "../../core/components/IconButton";
import Timestamp from "../../core/components/Timestamp";
import {
  EllipsisHorizontalIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import PostMenu from "./PostMenu";
import LikeCount from "../../core/components/LikeCount";
import PostReactions from "./PostReactions";

type PostProps = {
  post: Post;
};

export default function PostPreview({ post }: PostProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const multiplePhotos = post.photos.length > 1;

  const onPostMenuClick = () => {
    setMenuOpen(true);
  };

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
          <section className="">
            <PostReactions postId={post._id} />
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
