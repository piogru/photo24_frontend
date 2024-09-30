import Post from "../../core/types/post";
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
    <div onClick={onClick} className="group relative cursor-pointer">
      <div className="relative w-full h-full pb-[100%]">
        <img
          src={previewPhoto.url}
          alt={previewPhoto.altText}
          className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-sm"
        />
      </div>
      {multiplePhotos ?
        <Square2StackIcon className="absolute top-2 right-2 size-6 scale-x-[-1] scale-y-[-1] rounded-full drop-shadow-lg text-gray-200" />
      : null}

      <div
        className={`invisible group-hover:visible absolute inset-0 flex flex-col md:flex-row justify-center items-center
          gap-0 md:gap-4 font-bold group-hover:bg-black/25 text-gray-200`}
      >
        <div className="inline-block">
          <HeartIcon className="inline mr-1 size-6" />
          <span className="inline">{post.likes}</span>
        </div>
        {post.comments ?
          <div className="inline-block">
            <ChatBubbleOvalLeftIcon className="inline mr-1 size-6" />
            <span className="inline">{post.comments.length}</span>
          </div>
        : null}
      </div>
    </div>
  );
}
