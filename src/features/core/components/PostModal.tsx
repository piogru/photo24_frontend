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
import ProfilePic from "./ProfilePic";
import LikeCounter from "./LikeCount";

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
        onClose={() => setMenuOpen(false)}
        onDelete={onPostDelete}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        {post ?
          <div
            className={`flex max-h-[calc(100vh-theme(space.10))] w-full flex-col items-center
              justify-center rounded-b-xl transition sm:h-[calc(100vh-theme(space.10))]
              sm:flex-row lg:max-w-[80rem] xl:max-w-[92rem]`}
          >
            {!isSmBreakpoint ?
              <div
                className="flex w-full flex-row items-center justify-between border-b border-slate-300 px-3
                  py-2 dark:border-slate-600"
              >
                <UserBar user={post.user} />
                <IconButton
                  title="More options"
                  Icon={EllipsisHorizontalIcon}
                  onClick={onPostMenuClick}
                />
              </div>
            : null}

            <PhotoSlide photos={photos} />

            <div
              className="flex h-full w-full shrink-0 flex-row border-l border-slate-300 sm:w-80
                sm:basis-80 xl:w-[26rem] xl:basis-[26rem] dark:border-slate-600"
            >
              <div className="flex grow flex-col">
                {isSmBreakpoint ?
                  <header
                    className="flex w-full flex-row items-center justify-between border-b border-slate-300 px-3
                      py-2 dark:border-slate-600"
                  >
                    <UserBar user={post.user} />
                    <IconButton
                      title="More options"
                      Icon={EllipsisHorizontalIcon}
                      onClick={onPostMenuClick}
                    />
                  </header>
                : null}

                <div
                  className="hidden flex-grow flex-col gap-3 overflow-y-auto border-b border-slate-300 px-3
                    py-4 sm:flex dark:border-slate-600"
                >
                  <div className="flex flex-row gap-3">
                    <div className="size-8 shrink-0">
                      <ProfilePic photo={post?.user?.profilePic} />
                    </div>
                    <div className="flex flex-col justify-start gap-1">
                      <div className="whitespace-pre-line text-start">
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

                <section className="flex flex-row justify-between px-3 py-2">
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

                <section className="flex flex-col border-b border-slate-300 px-3 pb-2 dark:border-slate-600">
                  <LikeCounter
                    likes={post?.likes}
                    hideLikes={post?.hideLikes}
                  />
                  <Timestamp date={post?.createdAt} suffix />
                </section>

                <div className="hidden px-3 py-2">New comment</div>
              </div>
            </div>
          </div>
        : null}
      </Modal>
    </>
  );
}
