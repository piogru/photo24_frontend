import { useEffect, useState } from "react";
import PhotoPreview from "./PhotoPreview";
import PopoverMenu from "../../core/components/PopoverMenu";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpDownIcon,
  MagnifyingGlassPlusIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import WIP from "../../core/components/WIP";
import { Button } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { TPostSchema } from "../postSchema";

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

export default function StepCrop() {
  const { getValues } = useFormContext<TPostSchema>();
  const files = getValues("files");
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  useEffect(() => {
    setFileArray(
      getValues("files").map((item, idx) => ({
        key: idx,
        file: item,
      })),
    );
  }, [files, getValues]);

  return (
    <div className="flex h-full w-full flex-row">
      <div className="relative h-full w-full grow basis-full md:min-w-[28rem]">
        <PhotoPreview
          file={files[selectedFileIndex]}
          objectFit="object-cover"
        />

        <div
          className="absolute bottom-0 mb-3 flex w-full flex-row items-center justify-between gap-4
            px-4"
        >
          <div className="flex flex-row gap-4">
            <PopoverMenu
              anchor={"bottom start"}
              buttonContent={
                <div className={buttonStyle}>
                  <ChevronUpDownIcon className="size-8 rotate-45" />
                  <span className="sr-only">Crop</span>
                </div>
              }
            >
              <WIP />
            </PopoverMenu>
            <PopoverMenu
              anchor={"bottom start"}
              buttonContent={
                <div className={buttonStyle}>
                  <MagnifyingGlassPlusIcon className="size-6" />
                  <span className="sr-only">Zoom</span>
                </div>
              }
            >
              <WIP />
            </PopoverMenu>
          </div>
          <PopoverMenu
            anchor={"bottom end"}
            buttonContent={
              <div className={buttonStyle}>
                <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
                <span className="sr-only">Items</span>
              </div>
            }
          >
            <WIP />
          </PopoverMenu>
        </div>
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
      </div>
    </div>
  );
}
