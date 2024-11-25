import { Button } from "@headlessui/react";
import PhotoPreview from "./PhotoPreview";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type PostWizardPhotosProps = {
  files: File[];
};

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

export default function PostWizardPhotos({ files }: PostWizardPhotosProps) {
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  useEffect(() => {
    setFileArray(
      files.map((item, idx) => ({
        key: idx,
        file: item,
      })),
    );
  }, [files]);

  return (
    <>
      <PhotoPreview file={files[selectedFileIndex]} objectFit="object-cover" />
      {selectedFileIndex != 0 ?
        <Button
          onClick={() => {
            const newSelectedIndex = selectedFileIndex - 1;
            if (newSelectedIndex >= 0) {
              setSelectedFileIndex(newSelectedIndex);
            }
          }}
          className={`${buttonStyle} absolute bottom-1/2 left-2 top-1/2`}
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
      : null}
      {selectedFileIndex < files.length - 1 ?
        <Button
          onClick={() => {
            const newSelectedIndex = selectedFileIndex + 1;
            if (newSelectedIndex < files.length) {
              setSelectedFileIndex(newSelectedIndex);
            }
          }}
          className={`${buttonStyle} absolute bottom-1/2 right-2 top-1/2`}
        >
          <ChevronRightIcon className="size-6" />
        </Button>
      : null}
      {fileArray.length > 1 ?
        <div
          className="absolute bottom-0 mb-3 inline-flex w-full flex-row items-center justify-center
            gap-2"
        >
          {fileArray.map((item, idx) => (
            <div
              key={item.key}
              className={`size-2 rounded-full ${selectedFileIndex === idx ? "bg-blue-500" : "bg-gray-400"}`}
            />
          ))}
        </div>
      : null}
    </>
  );
}
