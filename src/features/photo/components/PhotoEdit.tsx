import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassPlusIcon,
  ChevronUpDownIcon,
  Square2StackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type FilePreviewProps = {
  files: File[];
};

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

export default function PhotoEdit({ files }: FilePreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(files[selectedFileIndex]);
    setPreview(objectUrl);

    const arr = Array.from(files).map((item, idx) => ({
      key: idx,
      file: item,
    }));
    setFileArray(arr);

    return () => URL.revokeObjectURL(objectUrl);
  }, [files, selectedFileIndex]);

  return (
    <div className="w-full h-full relative">
      {preview && (
        <img
          src={preview}
          className="h-full w-full object-cover rounded-b-xl"
        />
      )}
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

      {selectedFileIndex != 0 ?
        <Button
          onClick={() => {
            const newSelectedIndex = selectedFileIndex - 1;
            if (newSelectedIndex >= 0) {
              setSelectedFileIndex(newSelectedIndex);
            }
          }}
          className={`${buttonStyle} absolute top-1/2 bottom-1/2 left-2`}
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
          className={`${buttonStyle} absolute top-1/2 bottom-1/2 right-2`}
        >
          <ChevronRightIcon className="size-6" />
        </Button>
      : null}

      {fileArray.length > 1 ?
        <div className="absolute bottom-0 mb-3 w-full inline-flex flex-row justify-center items-center gap-2">
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
