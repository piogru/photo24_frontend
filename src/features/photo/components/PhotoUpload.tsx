import { useCallback, useEffect, useState } from "react";
import { Button, DialogTitle } from "@headlessui/react";
import Modal from "../../core/components/Modal";
import PhotoEdit from "./PhotoEdit";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FileRejection, useDropzone } from "react-dropzone";
import { imageLimit, imageMaxSize } from "../../core/constants/appConstants";
import PhotoDropArea from "./PhotoDropArea";
import { StageName } from "../types/stageName";

type PhotoUploadProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const steps = {
  dragAndDrop: {
    title: "Create new post",
  },
  crop: { title: "Crop" },
  share: { title: "Create new post" },
  sharing: { title: "Sharing" },
  error: { title: "File couldn't be uploaded" },
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
  const [stage, setStage] = useState<StageName>("dragAndDrop");

  useEffect(() => {
    if (fileRejections.length > 0 && files.length === 0) {
      setStage("error");
    }
    if ((stage === "dragAndDrop" || stage === "error") && files.length > 0) {
      setStage("crop");
    }
  }, [files, fileRejections, stage]);

  const handlePrevious = (stage: StageName) => {
    setDiscardAndClose(false);
    if (stage === "crop") {
      setIsDiscardConfirmationOpen(true);
    }

    switch (stage) {
      case "dragAndDrop":
        break;
      case "crop":
        break;
      case "share":
        setStage("crop");
        break;
      case "error":
        break;
    }
  };

  const handleNext = (stage: StageName) => {
    switch (stage) {
      case "dragAndDrop":
        setStage("crop");
        break;
      case "crop":
        setStage("share");
        break;
      case "share":
        console.log("Share to API");
        setStage("sharing");
        break;
      case "error":
        setStage("crop");
        break;
    }
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
    setStage("dragAndDrop");
    //todo: Cancel mutation
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        getRootProps={getRootProps}
        title={
          <DialogTitle className="font-semibold px-3 py-1 text-center text-lg border-b border-gray-100 dark:border-gray-900 w-full inline-flex flex-row justify-between items-center">
            {stage === "crop" || stage === "share" ?
              <Button onClick={() => handlePrevious(stage)}>
                <ArrowLeftIcon className="size-6 dark:text-white" />
              </Button>
            : null}
            <span className="mx-auto">{steps[stage].title}</span>
            {stage === "crop" || stage === "share" ?
              <Button
                onClick={() => handleNext(stage)}
                className="text-base text-blue-500"
              >
                {stage !== "share" ? "Next" : "Share"}
              </Button>
            : null}
          </DialogTitle>
        }
      >
        <div
          className={`${stage !== "share" ? "w-[28rem]" : "w-[48rem]"} h-[30rem] flex flex-col justify-center items-center rounded-b-xl transition ${isDragActive ? "bg-black/5 dark:bg-black/50" : ""}`}
        >
          {stage === "dragAndDrop" || stage === "error" ?
            <PhotoDropArea
              isDragActive={isDragActive}
              dropError={dropError}
              fileRejections={fileRejections}
              getInputProps={getInputProps}
            />
          : null}
          {stage === "crop" || stage === "share" ?
            <PhotoEdit files={files} stage={stage} />
          : null}

          {stage === "sharing" ?
            <div>Sharing</div>
          : null}
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
