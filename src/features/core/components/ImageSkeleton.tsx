import { CSSProperties } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

type ImageSkeletonProps = {
  style?: CSSProperties;
};

export default function ImageSkeleton({ style }: ImageSkeletonProps) {
  return (
    <div role="status" className="animate-pulse md:flex md:items-center">
      <div
        className="flex h-48 w-full items-center justify-center rounded bg-gray-300 sm:w-96
          dark:bg-gray-700"
        style={style}
      >
        <PhotoIcon className="size-8" />
      </div>
      <span className="sr-only">Loading image</span>
    </div>
  );
}
