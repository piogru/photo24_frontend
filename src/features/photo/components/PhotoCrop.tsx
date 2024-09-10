import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassPlusIcon,
  ChevronUpDownIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";

type FilePreviewProps = {
  files: FileList;
};

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full dark:bg-gray-800 hover:dark:bg-gray-800/50";

export default function PhotoCrop({ files }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(files[0]);
    setPreview(objectUrl);

    const arr = Array.from(files).map((item, idx) => ({
      key: idx,
      file: item,
    }));
    setFileArray(arr);

    return () => URL.revokeObjectURL(objectUrl);
  }, [files]);

  return (
    <div className="relative">
      {preview && <img src={preview} className="" />}
      <div className="absolute bottom-0 px-4 mb-3 w-full flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row gap-4">
          <Button className={buttonStyle}>
            <ChevronUpDownIcon className="size-8 rotate-45" />
            <span className="sr-only">Crop</span>
          </Button>
          <Button className={buttonStyle}>
            <MagnifyingGlassPlusIcon className="size-6" />
            <span className="sr-only">Zoom</span>
          </Button>
        </div>
        <Button className={buttonStyle}>
          <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
          <span className="sr-only">Items</span>
        </Button>
      </div>
      {fileArray.length > 1 ?
        <div className="absolute bottom-0 mb-3 w-full flex flex-row justify-between items-center gap-4">
          {Array.from(fileArray).map((item, idx) => (
            <div
              key={item.key}
              className={`size-2 rounded-full ${selectedFileIndex === idx ? "bg-blue-500" : "bg-gray-400"}`}
            />
          ))}
        </div>
      : null}
    </div>
  );
}
