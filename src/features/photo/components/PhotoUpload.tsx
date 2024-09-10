import { Button, DialogTitle, Input } from "@headlessui/react";
import Modal from "../../core/components/Modal";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, DragEvent, useState } from "react";
import PhotoCrop from "./PhotoCrop";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type PhotoUploadProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function PhotoUpload({ isOpen, setIsOpen }: PhotoUploadProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [dragState, setDragState] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
      setFiles(event.target.files);
    }
  };

  const handleNext = () => {
    console.log("Next");
  };

  const onClose = () => {
    setFiles(null);
    setIsOpen(false);

    // Discard modal if files available
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onDragEnter={() => setDragState(true)}
        onDragLeave={() => setDragState(false)}
        title={
          <DialogTitle className="font-bold p-3 text-center text-xl border-b border-gray-100 dark:border-gray-900">
            {files !== null ?
              <div className="w-full inline-flex flex-row justify-between items-center">
                <Button onClick={() => setIsConfirmationOpen(true)}>
                  <ArrowLeftIcon className="size-6 dark:text-white" />
                </Button>
                <span>Crop</span>
                <Button onClick={() => handleNext()} className="text-blue-500">
                  Next
                </Button>
              </div>
            : "Create new post"}
          </DialogTitle>
        }
      >
        <div
          className={`w-[28rem] h-[30rem] flex flex-col justify-center items-center ${dragState ? "bg-black/50" : ""}`}
        >
          {files === null ?
            <div className="flex flex-col justify-center gap-6 items-center p-4">
              <div className="flex flex-col items-center">
                <PhotoIcon
                  className={`size-20 stroke-1 ${dragState ? "text-blue-500" : null}`}
                />
                <span className="text-2xl">Drag photos here</span>
              </div>
              <div className="w-fit">
                <label
                  htmlFor="file_input"
                  className="px-6 py-1.5 bg-blue-500 disabled:bg-blue-400 hover:bg-blue-600 rounded-xl text-lg font-semibold text-white cursor-pointer"
                >
                  Select from computer
                </label>
                <Input
                  id="file_input"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          : <PhotoCrop files={files} />}
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <div className="flex flex-col">
          <DialogTitle className="">Discard post?</DialogTitle>
          <p className="">{"If you leave, edits won't be saved"}</p>
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => {
                setFiles(null);
                setIsConfirmationOpen(false);
              }}
              className="text-red-500"
            >
              Discard
            </Button>
            <Button onClick={() => setIsConfirmationOpen(false)} className="">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
