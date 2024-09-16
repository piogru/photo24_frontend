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
      <img
        src={previewPhoto.url}
        alt={previewPhoto.altText}
        className="h-64 w-full object-fill rounded-sm"
      />
      {multiplePhotos ?
        <Square2StackIcon className="absolute top-2 right-2 size-6 scale-x-[-1] scale-y-[-1] rounded-full drop-shadow-lg" />
      : null}

      <div
        className={`invisible group-hover:visible absolute top-0 w-full h-full flex flex-row justify-center items-center
          font-bold group-hover:bg-black/25`}
      >
        <HeartIcon className="inline mr-1 size-6" />
        <span className="inline">{post.likes}</span>
        {post.comments ?
          <div>
            <ChatBubbleOvalLeftIcon className="inline ml-8 mr-1 size-6" />
            <span className="inline">{post.comments.length}</span>
          </div>
        : null}
      </div>
    </div>
  );
}
