import { Input } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { DropzoneInputProps, FileRejection } from "react-dropzone";

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
    <div className="flex flex-col justify-center gap-6 items-center p-4">
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
          htmlFor="file_input"
          className="px-6 py-1.5 bg-blue-500 disabled:bg-blue-400 hover:bg-blue-600 rounded-xl text-lg font-semibold text-white cursor-pointer select-none"
        >
          {!dropError ? "Select from computer" : "Select other files"}
        </label>
        <QuestionMarkCircleIcon className="absolute top-0 -right-9 size-8" />
        <Input
          {...getInputProps({
            id: "file_input",
            type: "file",
            className: "hidden",
          })}
        />
      </div>
    </div>
  );
}
