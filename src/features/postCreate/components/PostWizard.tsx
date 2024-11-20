import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import DiscardDialog from "./DiscardDialog";
import Modal from "../../core/components/Modal";
import { useCallback, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiStepForm from "./MultiStepForm";
import MultiStepFormHeader from "./MultiStepFormHeader";
import MultiStepFormStep from "./multiStepFormStep";
import clsx from "clsx";
import usePostCreate from "../hooks/usePostCreate";
import MultiStepFormProvider from "./MultiStepFormProvider";
import PhotoDropArea from "./PhotoDropArea";
import { FileRejection, useDropzone } from "react-dropzone";
import { IMAGE_LIMIT, IMAGE_MAX_SIZE } from "../../core/constants/appConstants";

type PostWizardProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
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

export default function PostWizard({ isOpen, setIsOpen }: PostWizardProps) {
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] =
    useState(false);
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
  const mutation = usePostCreate();
  const [files, setFiles] = useState<File[]>([]);
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

  const onSubmit = async (data: FieldValues) => {
    // setStage("sharing");
    mutation.mutate(
      {
        // files: files,
        files: [],
        caption: data.caption,
        hideLikes: data.hideLikes,
        commentsOff: data.commentsOff,
        fileInfo: data.fileInfo,
      },
      {
        onSuccess: () => {
          // setStage("dragAndDrop");
          // setFiles([]);
          reset();
          setIsOpen(false);
        },
        onError: () => {
          // setStage("share");
        },
      },
    );
  };

  const onClose = () => {
    setIsOpen(false);

    // setDiscardAndClose(true);
    // files.length > 0 ? setIsDiscardConfirmationOpen(true) : setIsOpen(false);
  };

  const onDiscard = () => {
    setIsDiscardConfirmationOpen(false);
    // setFiles([]);

    // if (discardAndClose) {
    //   setIsOpen(false);
    // }
    // setStage("dragAndDrop");
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <MultiStepFormProvider
          initialState={{
            stepNames: [
              "Create new post",
              "Crop",
              "Share",
              "Sharing",
              "Complete",
              "Error",
            ],
            form: formMethods,
          }}
        >
          <Modal isOpen={isOpen} onClose={onClose} getRootProps={getRootProps}>
            <div
              className={clsx(
                `flex h-[calc(min(30rem,_100vh-theme(space.20)))] w-full flex-col items-center
                justify-center rounded-b-xl transition`,
                isDragActive ? "bg-black/5 dark:bg-black/50" : "",
              )}
            >
              <MultiStepForm onSubmit={onSubmit}>
                <MultiStepFormHeader />
                {/* <DialogTitle
                    className="inline-flex w-full flex-row items-center justify-between border-b
                      border-gray-100 px-3 py-1 text-center text-lg font-semibold dark:border-gray-900"
                  ></DialogTitle>
                </MultiStepFormHeader> */}

                <MultiStepFormStep name="Create new post">
                  <PhotoDropArea
                    isDragActive={isDragActive}
                    fileRejections={fileRejections}
                    getInputProps={getInputProps}
                  />
                </MultiStepFormStep>
                <MultiStepFormStep name="Crop">{"Crop"}</MultiStepFormStep>
                <MultiStepFormStep name="Share">{"Share"}</MultiStepFormStep>
                <MultiStepFormStep name="Sharing">
                  {"Sharing"}
                </MultiStepFormStep>
                <MultiStepFormStep name="Complete">
                  {"Complete"}
                </MultiStepFormStep>
                <MultiStepFormStep name="Error">{"Step two"}</MultiStepFormStep>
              </MultiStepForm>
            </div>
          </Modal>

          <DiscardDialog
            isOpen={isDiscardConfirmationOpen}
            onClose={() => setIsDiscardConfirmationOpen(false)}
            onDiscard={onDiscard}
          />
        </MultiStepFormProvider>
      </FormProvider>
    </>
  );
}
