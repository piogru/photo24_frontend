import { Button, DialogTitle, Input } from "@headlessui/react";
import Modal from "../../core/components/Modal";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";
import PhotoCrop from "./PhotoCrop";
import {
  ArrowLeftIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { FileRejection, useDropzone } from "react-dropzone";
import { imageLimit, imageMaxSize } from "../../core/constants/appConstants";

type PhotoUploadProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function PhotoUpload({ isOpen, setIsOpen }: PhotoUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] =
    useState(false);
  const [discardAndClose, setDiscardAndClose] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length === 0) {
        setFiles(acceptedFiles);
      }
    },
    [],
  );
  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpeg", ".jpg"],
      },
      disabled: files.length > 0,
      onDrop: onDrop,
      onError: (error) => {
        console.log("Dropzone - error", error);
      },
      maxFiles: imageLimit,
      maxSize: imageMaxSize,
      multiple: true,
    });
  const dropError = fileRejections.length > 0;

  const handlePrevious = () => {
    setDiscardAndClose(false);
    setIsDiscardConfirmationOpen(true);
  };

  const handleNext = () => {
    console.log("Next");
  };

  const onClose = () => {
    setDiscardAndClose(true);
    files.length > 0 ? setIsDiscardConfirmationOpen(true) : setIsOpen(false);
  };

  const onDiscard = () => {
    setIsDiscardConfirmationOpen(false);
    setFiles([]);

    if (discardAndClose) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        getRootProps={getRootProps}
        title={
          <DialogTitle className="font-semibold px-3 py-1 text-center text-lg border-b border-gray-100 dark:border-gray-900">
            {files.length === 0 ?
              <>
                {!dropError ? "Create new post" : "Files could not be uploaded"}
              </>
            : <div className="w-full inline-flex flex-row justify-between items-center">
                <Button onClick={handlePrevious}>
                  <ArrowLeftIcon className="size-6 dark:text-white" />
                </Button>
                <span>Crop</span>
                <Button
                  onClick={() => handleNext()}
                  className="text-base text-blue-500"
                >
                  Next
                </Button>
              </div>
            }
          </DialogTitle>
        }
      >
        <div
          className={`w-[28rem] h-[30rem] flex flex-col justify-center items-center rounded-b-xl ${isDragActive ? "bg-black/5 dark:bg-black/50" : ""}`}
        >
          {files.length === 0 ?
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
                      <span className="">
                        {fileRejections[0].errors[0].message}
                      </span>
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
          : <PhotoCrop files={files} />}
        </div>
      </Modal>

      <Modal
        isOpen={isDiscardConfirmationOpen}
        onClose={() => setIsDiscardConfirmationOpen(false)}
      >
        <div className="w-96 flex flex-col items-center gap-4">
          <div className="mt-6 mb-4 flex flex-col items-center gap-1 text-center">
            <DialogTitle className="text-xl font-semibold">
              Discard post?
            </DialogTitle>
            <p className="text-sm text-gray-800 dark:text-gray-400">
              {"If you leave, your edits won't be saved"}
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <Button
              autoFocus
              onClick={onDiscard}
              className="w-full py-3 font-semibold text-red-500 border-t border-slate-300 dark:border-slate-600"
            >
              Discard
            </Button>
            <Button
              onClick={() => setIsDiscardConfirmationOpen(false)}
              className="w-full py-3 border-t border-slate-300 dark:border-slate-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
