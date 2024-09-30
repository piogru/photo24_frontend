import { useCallback, useEffect, useState } from "react";
import { Button, DialogTitle } from "@headlessui/react";
import Modal from "../../core/components/Modal";
import PhotoEdit from "./PhotoEdit";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FileRejection, useDropzone } from "react-dropzone";
import { IMAGE_LIMIT, IMAGE_MAX_SIZE } from "../../core/constants/appConstants";
import PhotoDropArea from "./PhotoDropArea";
import StageName from "../types/stageName";
import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { postPost } from "../api/queries";
import Spinner from "../../core/components/Spinner";

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

const PostSchema = z.object({
  caption: z.string(),
  hideLikes: z.boolean(),
  commentsOff: z.boolean(),
  fileInfo: z.array(
    z.object({
      altText: z.string(),
    }),
  ),
});

type TPostSchema = z.infer<typeof PostSchema>;

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
      maxFiles: IMAGE_LIMIT,
      maxSize: IMAGE_MAX_SIZE,
      multiple: true,
    });
  const dropError = fileRejections.length > 0;
  const [stage, setStage] = useState<StageName>("dragAndDrop");
  const formMethods = useForm<TPostSchema>({
    defaultValues: {
      hideLikes: false,
      commentsOff: false,
    },
  });
  const { control, handleSubmit, reset } = formMethods;
  const { replace } = useFieldArray({
    control,
    name: "fileInfo",
  });
  const mutation = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      setIsOpen(false);
      setStage("dragAndDrop");
      setFiles([]);
      reset();
    },
    onError: () => {
      setStage("share");
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0 && files.length === 0) {
      setStage("error");
    }
    if ((stage === "dragAndDrop" || stage === "error") && files.length > 0) {
      setStage("crop");
    }
  }, [files, fileRejections, stage]);

  useEffect(() => {
    replace(
      files.map(() => ({
        altText: "",
      })),
    );
  }, [files, replace]);

  const submitFunc = async (data: FieldValues) => {
    setStage("sharing");
    mutation.mutate({
      files: files,
      caption: data.caption,
      hideLikes: data.hideLikes,
      commentsOff: data.commentsOff,
      fileInfo: data.fileInfo,
    });
  };

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
        handleSubmit(submitFunc)();
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
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form>
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
                    className="text-base text-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {stage !== "share" ? "Next" : "Share"}
                  </Button>
                : null}
              </DialogTitle>
            }
          >
            <div
              className={`w-full h-[30rem] flex flex-col justify-center items-center rounded-b-xl transition ${isDragActive ? "bg-black/5 dark:bg-black/50" : ""}`}
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
                <div className="min-w-80 sm:min-w-96 flex flex-row grow justify-center items-center">
                  <Spinner size="xl" />
                </div>
              : null}
            </div>
          </Modal>
        </form>
      </FormProvider>

      <Modal
        isOpen={isDiscardConfirmationOpen}
        onClose={() => setIsDiscardConfirmationOpen(false)}
      >
        <div className="w-full sm:w-96 flex flex-col items-center gap-4">
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
