import { useEffect, useState } from "react";
import ImageSkeleton from "./ImageSkeleton";
import Photo from "../types/photo";

type PhotoProps = {
  photo: Photo;
};

export default function PhotoDisplay({ photo }: PhotoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [photo]);

  return (
    <>
      {!imageLoaded ?
        <ImageSkeleton style={{ width: photo.width, height: photo.height }} />
      : null}
      <img
        src={photo.url}
        alt={photo.altText}
        onLoad={() => {
          setImageLoaded(true);
        }}
        className="mx-auto h-full object-cover"
      />
    </>
  );
}
