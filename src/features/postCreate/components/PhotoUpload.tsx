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
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import DiscardDialog from "./DiscardDialog";

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

const postSchema = z.object({
  caption: z.string().max(2500),
  hideLikes: z.boolean(),
  commentsOff: z.boolean(),
  fileInfo: z.array(
    z.object({
      altText: z.string().max(128),
    }),
  ),
});

type TPostSchema = z.infer<typeof postSchema>;

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
    resolver: zodResolver(postSchema),
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
    mutation.mutate(
      {
        files: files,
        caption: data.caption,
        hideLikes: data.hideLikes,
        commentsOff: data.commentsOff,
        fileInfo: data.fileInfo,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setStage("dragAndDrop");
          setFiles([]);
          reset();
        },
        onError: () => {
          setStage("share");
        },
      },
    );
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
              <DialogTitle
                className="inline-flex w-full flex-row items-center justify-between border-b
                  border-gray-100 px-3 py-1 text-center text-lg font-semibold dark:border-gray-900"
              >
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
              className={clsx(
                `flex h-[calc(min(30rem,_100vh-theme(space.20)))] w-full flex-col items-center
                justify-center rounded-b-xl transition`,
                isDragActive ? "bg-black/5 dark:bg-black/50" : "",
              )}
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
                <div className="flex min-w-80 grow flex-row items-center justify-center sm:min-w-96">
                  <Spinner size="xl" />
                </div>
              : null}
            </div>
          </Modal>
        </form>
      </FormProvider>

      <DiscardDialog
        isOpen={isDiscardConfirmationOpen}
        onClose={() => setIsDiscardConfirmationOpen(false)}
        onDiscard={onDiscard}
      />
    </>
  );
}
