import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike, postLike } from "../api/queries";
import useLikeQuery from "../hooks/useLikeQuery";
import usePostQuery from "../hooks/usePostQuery";
import { postDetailsLoader } from "../api/loaders";
import Post from "../types/post";
import Modal from "./Modal";
import UserBar from "./UserBar";
import Timestamp from "./Timestamp";
import IconButton from "./IconButton";
import PhotoSlide from "./PhotoSlide";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import useBreakpoint from "../hooks/useBreakpoint";
import PostMenu from "./PostMenu";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
};

export default function PostModal({
  post: postProp,
  isOpen,
  onClose,
}: PostModalProps) {
  const isSmBreakpoint = useBreakpoint("sm");
  const [menuOpen, setMenuOpen] = useState(false);
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof postDetailsLoader>>
  >;
  const queryClient = useQueryClient();
  const { data: post } = usePostQuery(
    postProp._id,
    initialData?.post || undefined,
  );
  const photos = post?.photos || [];
  const comments = post?.comments || [];
  const { data: like } = useLikeQuery(
    post?._id || "",
    initialData?.like || undefined,
  );
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
    onClose();
  };

  return (
    <>
      <PostMenu
        post={post}
        isOpen={menuOpen}
        onClose={onPostDelete}
        onDelete={onPostDelete}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full lg:max-w-[80rem] xl:max-w-[92rem] h-fit sm:h-[calc(100vh-theme(space.10))] flex flex-col sm:flex-row justify-center items-center rounded-b-xl transition">
          {!isSmBreakpoint ?
            <div className="w-full flex flex-row justify-between items-center px-3 py-2 border-b border-slate-300 dark:border-slate-600">
              {post?.user ?
                <UserBar user={post.user} />
              : null}
              <IconButton
                disabled
                title="More options"
                Icon={EllipsisHorizontalIcon}
                onClick={onPostMenuClick}
              />
            </div>
          : null}

          {/* // todo: aspect in div below */}
          <div className="max-w-3xl h-full flex flex-col flex-grow items-center justify-center border-r border-slate-300 dark:border-slate-600">
            <PhotoSlide photos={photos} />
          </div>

          <div className="w-full sm:w-80 xl:w-[28rem] h-full flex flex-row">
            <div className="w-full h-full flex-grow flex flex-col">
              {isSmBreakpoint ?
                <div className="w-full flex flex-row justify-between items-center px-3 py-2 border-b border-slate-300 dark:border-slate-600">
                  {post?.user ?
                    <UserBar user={post.user} />
                  : null}
                  <IconButton
                    title="More options"
                    Icon={EllipsisHorizontalIcon}
                    onClick={onPostMenuClick}
                  />
                </div>
              : null}

              <div className="flex flex-col flex-grow px-3 py-4 gap-3 overflow-y-auto border-b border-slate-300 dark:border-slate-600">
                <div className="flex flex-row gap-3">
                  <div className="size-8 rounded-full flex-shrink-0 bg-gray-500" />
                  <div className="flex flex-col justify-start gap-1">
                    <div className="text-start whitespace-pre-line">
                      <span className="inline-flex font-semibold">
                        {post?.user ? post.user.name : "Unknown user"}
                      </span>{" "}
                      <p className="inline">{post?.caption}</p>
                    </div>
                    <Timestamp date={post?.createdAt} />
                  </div>
                </div>

                {isSmBreakpoint ?
                  <>
                    {comments.map((comment) => (
                      <div key={comment._id}>Comment component</div>
                    ))}
                  </>
                : null}
              </div>

              <div className="flex flex-row justify-between px-3 py-2">
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

              <div className="flex flex-col px-3 pb-2 border-b border-slate-300 dark:border-slate-600">
                <div className="font-semibold">{post?.likes} likes</div>
                <Timestamp date={post?.createdAt} suffix />
              </div>

              <div className="px-3 py-2 hidden">New comment</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
