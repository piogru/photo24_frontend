import Post from "../types/post";
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";

type PostSquareProps = {
  post: Post;
  onClick?: () => void;
};

export default function PostSquare({ post, onClick }: PostSquareProps) {
  const previewPhoto = post.photos[0];
  const multiplePhotos = post.photos.length > 1;

  return (
    <article onClick={onClick} className="group relative cursor-pointer">
      <div className="relative h-full w-full pb-[100%]">
        <img
          src={previewPhoto.url}
          alt={previewPhoto.altText}
          className="absolute left-0 top-0 h-full w-full rounded-sm object-cover object-center"
        />
      </div>
      {multiplePhotos ?
        <Square2StackIcon
          className="absolute right-2 top-2 size-6 scale-x-[-1] scale-y-[-1] rounded-full
            text-gray-200 drop-shadow-lg"
        />
      : null}

      <div
        className={`invisible absolute inset-0 flex flex-col items-center justify-center gap-0
          font-bold text-gray-200 group-hover:visible group-hover:bg-black/25 md:flex-row
          md:gap-4`}
      >
        {!post.hideLikes ?
          <div className="inline-block">
            <HeartIcon className="mr-1 inline size-6" />
            <span className="inline">{post.likes}</span>
          </div>
        : null}
        {!post.commentsOff ?
          <div className="inline-block">
            <ChatBubbleOvalLeftIcon className="mr-1 inline size-6" />
            <span className="inline">{post.comments.length}</span>
          </div>
        : null}
      </div>
    </article>
  );
}
