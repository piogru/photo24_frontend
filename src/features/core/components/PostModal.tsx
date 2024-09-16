import { useState } from "react";
import Post from "../types/post";
import Modal from "./Modal";
import UserBar from "./UserBar";
import { Button } from "@headlessui/react";
import { formatDistanceStrict } from "date-fns";
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
  const timePosted = formatDistanceStrict(
    new Date(post.createdAt),
    new Date(),
    {
      addSuffix: true,
    },
  );

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-[64rem] h-[30rem] flex flex-row justify-center items-center rounded-b-xl transition">
        {currentPhoto ?
          <div className="h-full flex flex-col items-center justify-center border-r border-slate-300 dark:border-slate-600">
            <div className="relative">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.altText}
                className="w-full h-full object-cover"
              />

              {currentPhotoIndex > 0 ?
                <Button
                  onClick={handlePrevious}
                  className="absolute left-0 p-1"
                >
                  <ChevronLeftIcon className="size-6" />
                </Button>
              : null}
              {currentPhotoIndex < photos.length - 1 ?
                <Button onClick={handleNext} className="absolute right-0 p-1">
                  <ChevronRightIcon className="size-6" />
                </Button>
              : null}
              {photos.length > 0 ?
                <div className="absolute bottom-3 w-full flex flex-row justify-center items-center gap-0.5">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="size-1.5 rounded-full bg-gray-500"
                    ></div>
                  ))}
                </div>
              : null}
            </div>
          </div>
        : null}
        <div className="w-full h-full max-w-md flex-grow flex flex-col">
          <div className="w-full flex flex-row justify-between items-center gap-2 border-b border-slate-300 dark:border-slate-600">
            <div>
              {post.user ?
                <UserBar user={post.user} />
              : null}
              <span>{"•"}</span>
              <Button className="text-sm text-blue-500 hover:text-gray-800 dark:hover:text-gray-200">
                Follow
              </Button>
            </div>
            <Button>
              <EllipsisHorizontalIcon className="size-6" />
            </Button>
          </div>
          <div className="flex-grow border-b border-slate-300 dark:border-slate-600">
            <div className="flex flex-row">
              <div className="size-10 rounded-full bg-gray-500"></div>
              <div>
                {post?.user?.name} {post.caption}
              </div>
              <div>{post.createdAt}</div>
            </div>
            {comments.map((comment) => (
              <div key={comment._id}>Comment component</div>
            ))}
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Button title="Like">
                <HeartIcon className="size-6" />
              </Button>
              <Button title="Comment">
                <ChatBubbleOvalLeftIcon className="size-6" />
              </Button>
              <Button title="Share">
                <ShareIcon className="size-6" />
              </Button>
            </div>
            <div>
              <Button title="Save">
                <BookmarkIcon className="size-6" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="">{post.likes} likes</div>
            <div className="text-sm">{timePosted}</div>
          </div>

          <div>New comment</div>
        </div>
      </div>
    </Modal>
  );
}
