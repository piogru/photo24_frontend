import { Button } from "@headlessui/react";
import { format, formatDistanceStrict } from "date-fns";
import UserBar from "../../core/components/UserBar";
import Post from "../../core/types/post";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import ShowMoreText from "../../core/components/ShowMoreText";

type PostProps = {
  post: Post;
};

export default function PostPreview({ post }: PostProps) {
  const multiplePhotos = post.photos.length > 1;
  const timePosted = formatDistanceStrict(
    new Date(post.createdAt),
    new Date(),
    {
      addSuffix: true,
    },
  );
  const createdAt = format(post.createdAt, "MMM dd, yyyy");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-1">
          <UserBar user={post?.user} />
          <span>{"•"}</span>
          <div
            title={createdAt}
            className="text-sm text-gray-800 dark:text-gray-400"
          >
            {timePosted}
          </div>
        </div>
        <Button>
          <EllipsisHorizontalIcon className="size-6" />
        </Button>
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

      <div className="font-semibold">X likes</div>

      {post.caption?.length > 0 ?
        <div>
          <span className="inline mr-1 font-semibold">
            {post.user?.name || "user"}
          </span>
          <ShowMoreText text={post.caption} overflowLength={100} />
        </div>
      : null}

      <div>New comment component</div>
    </div>
  );
}
