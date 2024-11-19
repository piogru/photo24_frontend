import { Input } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { DropzoneInputProps, FileRejection } from "react-dropzone";
import PopoverTooltip from "../../core/components/PopoverTooltip";
import {
  IMAGE_LIMIT,
  IMAGE_MAX_SIZE_MB,
} from "../../core/constants/appConstants";

type PhotoDropAreaProps = {
  isDragActive: boolean;
  dropError: boolean;
  fileRejections: FileRejection[];
  getInputProps: <T extends DropzoneInputProps>(props: T) => T;
};

export default function PhotoDropArea({
  isDragActive,
  dropError,
  fileRejections,
  getInputProps,
}: PhotoDropAreaProps) {
  return (
    <div className="flex min-w-80 flex-col items-center justify-center gap-6 p-4 sm:min-w-96">
      <div className="flex flex-col items-center">
        {!dropError ?
          <>
            <PhotoIcon
              className={`size-20 stroke-1 ${isDragActive ? "text-blue-500" : null}`}
            />
            <span className="text-2xl">Drag photos here</span>
          </>
        : <>
            <ExclamationCircleIcon className="size-20 stroke-1" />
            <span className="text-2xl">This file is not supported</span>
            <div className="inline text-gray-800 dark:text-gray-400">
              <span className="font-semibold">
                {fileRejections[0].file.name}{" "}
              </span>
              <span className="">{fileRejections[0].errors[0].message}</span>
            </div>
          </>
        }
      </div>
      <div className="relative w-fit">
        <label
          htmlFor="post_photo_input"
          className="cursor-pointer select-none rounded-xl bg-blue-500 px-6 py-1.5 text-lg
            font-semibold text-white hover:bg-blue-600 disabled:bg-blue-400"
        >
          {!dropError ? "Select from computer" : "Select other files"}
        </label>
        <div className="absolute -right-9 top-0">
          <PopoverTooltip
            label={`Max filesize: ${IMAGE_MAX_SIZE_MB}MB\nMax ${IMAGE_LIMIT} files`}
          >
            <QuestionMarkCircleIcon className="size-8" />
          </PopoverTooltip>
        </div>
        <Input
          {...getInputProps({
            id: "post_photo_input",
            type: "file",
            className: "hidden",
          })}
        />
      </div>
    </div>
  );
}
