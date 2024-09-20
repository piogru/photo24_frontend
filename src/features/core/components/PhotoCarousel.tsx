import { useState } from "react";
import Photo from "../types/photo";
import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type PhotoSlideProps = {
  photos: Photo[];
};

export default function PhotoSlide({ photos }: PhotoSlideProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const currentPhoto = photos[currentPhotoIndex];

  const previousAvailable = currentPhotoIndex > 0;
  const nextAvailable = currentPhotoIndex < photos.length - 1;

  const handlePrevious = () => {
    if (previousAvailable) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleNext = () => {
    if (nextAvailable) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  return (
    <div className="relative w-full">
      {currentPhoto ?
        <img
          src={currentPhoto.url}
          alt={currentPhoto.altText}
          className="w-full h-full object-cover"
        />
      : null}

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
  );
}
