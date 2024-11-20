import {
  FieldValues,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import DiscardDialog from "./DiscardDialog";
import Modal from "../../core/components/Modal";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiStepForm from "./MultiStepForm";
import MultiStepFormHeader from "./MultiStepFormHeader";
import MultiStepFormStep from "./MultiStepFormStep";
import clsx from "clsx";
import usePostCreate from "../hooks/usePostCreate";
import PhotoDropArea from "./PhotoDropArea";
import { FileRejection, useDropzone } from "react-dropzone";
import { IMAGE_LIMIT, IMAGE_MAX_SIZE } from "../../core/constants/appConstants";
import StepCrop from "./StepCrop";
import StepShare from "./StepShare";
import StepSharing from "./StepSharing";
import useFormActions from "../hooks/useFormActions";
import { postSchema, TPostSchema } from "../postSchema";

type PostWizardProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function PostWizard({ isOpen, setIsOpen }: PostWizardProps) {
  const actions = useFormActions();
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] =
    useState(false);
  const formMethods = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      files: [],
      hideLikes: false,
      commentsOff: false,
    },
  });
  const { control, setValue, reset, getValues } = formMethods;
  const files = getValues("files");
  const { replace } = useFieldArray({
    control,
    name: "fileInfo",
  });
  const mutation = usePostCreate();
  // const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length === 0) {
        setValue("files", acceptedFiles);
      }
    },
    [setValue],
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

  useEffect(() => {
    replace(
      files.map(() => ({
        altText: "",
      })),
    );
  }, [files, replace]);

  const onSubmit = async (data: FieldValues) => {
    actions.nextStep();
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
          reset();
        },
        onError: () => {
          actions.prevStep();
        },
      },
    );
  };

  const onClose = () => {
    files.length > 0 ? setIsDiscardConfirmationOpen(true) : setIsOpen(false);
  };

  const onDiscard = () => {
    // TODO: Fix transition to drop area
    actions.goToStep(0);
    setIsDiscardConfirmationOpen(false);
    reset();
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <Modal isOpen={isOpen} onClose={onClose} getRootProps={getRootProps}>
          <div
            className={clsx(
              `flex h-[calc(min(30rem,_100vh-theme(space.20)))] w-full flex-col items-center
              justify-center rounded-b-xl transition`,
              isDragActive ? "bg-black/5 dark:bg-black/50" : "",
            )}
          >
            <MultiStepForm onSubmit={onSubmit}>
              <MultiStepFormHeader
                openDiscard={() => setIsDiscardConfirmationOpen(true)}
              />

              <MultiStepFormStep name="Create new post">
                <PhotoDropArea
                  isDragActive={isDragActive}
                  fileRejections={fileRejections}
                  getInputProps={getInputProps}
                />
              </MultiStepFormStep>
              <MultiStepFormStep name="Crop">
                <StepCrop />
              </MultiStepFormStep>
              <MultiStepFormStep name="Share">
                <StepShare />
              </MultiStepFormStep>
              <MultiStepFormStep name="Sharing">
                <StepSharing />
              </MultiStepFormStep>
              <MultiStepFormStep name="Complete">
                {"Complete"}
              </MultiStepFormStep>
            </MultiStepForm>
          </div>
        </Modal>

        <DiscardDialog
          isOpen={isDiscardConfirmationOpen}
          onClose={() => setIsDiscardConfirmationOpen(false)}
          onDiscard={onDiscard}
        />
      </FormProvider>
    </>
  );
}
