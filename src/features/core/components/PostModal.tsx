import { useState } from "react";
import Post from "../types/post";
import Modal from "./Modal";
import UserBar from "./UserBar";
import { Button } from "@headlessui/react";
import { format, formatDistanceToNowStrict } from "date-fns";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
};

export default function PostModal({ post, isOpen, onClose }: PostModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = post.photos || [];
  const comments = post.comments;
  const currentPhoto = photos[currentPhotoIndex];
  const createdAt = format(post.createdAt, "MMM dd, yyyy");
  const timePostedSuffix = formatDistanceToNowStrict(new Date(post.createdAt), {
    addSuffix: true,
  });
  const distanceToPosted = formatDistanceToNowStrict(
    new Date(post.createdAt),
  ).split(" ");
  const timePosted = `${distanceToPosted[0]} ${distanceToPosted[1][0]}`;

  const handlePrevious = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const onFollowClick = () => {};

  console.log(post);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full lg:max-w-[80rem] xl:max-w-[92rem] h-[calc(100vh-theme(space.10))] flex flex-row justify-center items-center rounded-b-xl transition">
        {currentPhoto ?
          // todo: aspect in div below
          <div className="max-w-5xl h-full flex flex-col flex-grow items-center justify-center border-r border-slate-300 dark:border-slate-600">
            <div className="relative w-full">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.altText}
                className="w-full h-full object-cover"
              />

              {currentPhotoIndex > 0 ?
                <Button
                  onClick={handlePrevious}
                  className="absolute left-0 top-0 bottom-0 p-1"
                >
                  <ChevronLeftIcon className="size-6" />
                </Button>
              : null}
              {currentPhotoIndex < photos.length - 1 ?
                <Button
                  onClick={handleNext}
                  className="absolute right-0 top-0 bottom-0 p-1"
                >
                  <ChevronRightIcon className="size-6" />
                </Button>
              : null}

              {photos.length > 1 ?
                <div className="absolute bottom-3 w-full flex flex-row justify-center items-center gap-1">
                  {[...Array(photos.length).keys()].map((item) => (
                    <div
                      key={item}
                      className={`size-1.5 rounded-full transition ${item === currentPhotoIndex ? "bg-gray-200 " : "bg-gray-400"}`}
                    />
                  ))}
                </div>
              : null}
            </div>
          </div>
        : null}
        <div className="w-80 xl:w-[28rem] h-full flex flex-row">
          <div className="w-full h-full flex-grow flex flex-col">
            <div className="w-full flex flex-row justify-between items-center gap-2 px-3 py-2 border-b border-slate-300 dark:border-slate-600">
              <div className="flex flex-row items-center gap-1">
                {post.user ?
                  <UserBar user={post.user} />
                : null}
                <span>{"•"}</span>
                <Button
                  onClick={onFollowClick}
                  className="text-sm text-blue-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {false ? "Following" : "Follow"}
                </Button>
              </div>
              <Button className="hidden">
                <EllipsisHorizontalIcon className="size-6" />
              </Button>
            </div>

            <div className="flex flex-col flex-grow px-3 py-4 gap-3 overflow-y-auto border-b border-slate-300 dark:border-slate-600">
              <div className="flex flex-row gap-3">
                <div className="size-8 rounded-full flex-shrink-0 bg-gray-500" />
                <div className="flex flex-col justify-start gap-1">
                  <div className="text-start whitespace-pre-line">
                    <span className="inline-flex font-semibold">
                      {post?.user?.name} Account name
                    </span>{" "}
                    <p className="inline">{post.caption}</p>
                  </div>
                  <div
                    title={createdAt}
                    className="text-xs text-gray-800 dark:text-gray-400"
                  >
                    {timePosted}
                  </div>
                </div>
              </div>
              {comments.map((comment) => (
                <div key={comment._id}>Comment component</div>
              ))}
            </div>

            <div className="flex flex-row justify-between px-3 py-2">
              <div className="flex flex-row items-center gap-2">
                <Button
                  title="Like"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400
                  active:text-gray-700 dark:active:text-gray-500"
                >
                  <HeartIcon className="size-7" />
                </Button>
                <Button
                  title="Comment"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400
                  active:text-gray-700 dark:active:text-gray-500"
                >
                  <ChatBubbleOvalLeftIcon className="size-7" />
                </Button>
                <Button
                  title="Share"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400
                  active:text-gray-700 dark:active:text-gray-500"
                >
                  <ShareIcon className="size-7" />
                </Button>
              </div>
              <div>
                <Button
                  title="Save"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-400
                  active:text-gray-700 dark:active:text-gray-500"
                >
                  <BookmarkIcon className="size-7" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col px-3 pb-2 border-b border-slate-300 dark:border-slate-600">
              <div className="font-semibold">{post.likes} likes</div>
              <div
                title={createdAt}
                className="text-xs text-gray-800 dark:text-gray-400"
              >
                {timePostedSuffix}
              </div>
            </div>

            <div className="px-3 py-2">New comment</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
