import { useState } from "react";
import Photo from "../../core/types/photo";
import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useBreakpoint from "../../core/hooks/useBreakpoint";
import clsx from "clsx";
import PhotoDisplay from "../../core/components/PhotoDisplay";

type PhotoSlideProps = {
  photos: Photo[];
};

export default function PhotoSlide({ photos }: PhotoSlideProps) {
  const isSmBreakpoint = useBreakpoint("sm");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = photos[currentPhotoIndex];
  const previousAvailable = currentPhotoIndex > 0;
  const nextAvailable = currentPhotoIndex < photos.length - 1;
  const containerStyle = {
    aspectRatio: `${currentPhoto.width}/${currentPhoto.height}`,
    maxHeight: `min(${currentPhoto.height}px, calc(100vh - ${isSmBreakpoint ? "2.5rem" : "14rem"}))`,
    maxWidth: `min(${currentPhoto.width}px, 100vw)`,
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex(currentPhotoIndex - 1);
  };

  const handleNext = () => {
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  };

  return (
    <div className="h-fit w-fit min-w-48" style={containerStyle}>
      <div className="relative h-full w-full">
        <div className="h-full w-full">
          <PhotoDisplay photo={currentPhoto} />
        </div>

        {currentPhotoIndex > 0 ?
          <Button
            onClick={handlePrevious}
            disabled={!previousAvailable}
            className="absolute bottom-0 left-0 top-0 p-1 text-gray-200"
          >
            <ChevronLeftIcon className="size-6" />
          </Button>
        : null}
        {currentPhotoIndex < photos.length - 1 ?
          <Button
            onClick={handleNext}
            disabled={!nextAvailable}
            className="absolute bottom-0 right-0 top-0 p-1 text-gray-200"
          >
            <ChevronRightIcon className="size-6" />
          </Button>
        : null}

        {photos.length > 1 ?
          <div className="absolute bottom-3 flex w-full flex-row items-center justify-center gap-1">
            {[...Array(photos.length).keys()].map((item) => (
              <div
                key={item}
                className={clsx(
                  "size-1.5 rounded-full transition",
                  item === currentPhotoIndex ? "bg-gray-200" : "bg-gray-400",
                )}
              />
            ))}
          </div>
        : null}
      </div>
    </div>
  );
}
