import clsx from "clsx";
import PhotoPreview from "./PhotoPreview";
import { Button, Textarea } from "@headlessui/react";
import { useEffect, useState } from "react";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import useBreakpoint from "../../core/hooks/useBreakpoint";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import ConnectForm from "../../core/components/ConnectForm";
import ProfilePic from "../../core/components/ProfilePic";
import Accordion from "../../core/components/Accordion";
import Input from "../../core/components/Input";
import Switch from "../../core/components/Switch";
import { TPostSchema } from "../postSchema";

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

export default function StepShare() {
  const { data: currentUser } = useCurrentUserQuery();
  const { getValues, control } = useFormContext<TPostSchema>();
  const files = getValues("files");
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const { fields } = useFieldArray({
    control,
    name: "fileInfo",
  });
  const isSmBreakpoint = useBreakpoint("sm");

  useEffect(() => {
    const arr = getValues("files").map((item, idx) => ({
      key: idx,
      file: item,
    }));

    setFileArray(arr);
  }, [files, getValues]);

  useEffect(() => {
    setFileArray(
      files.map((item, idx) => ({
        key: idx,
        file: item,
      })),
    );
  }, [files]);

  return (
    <div className="flex h-full w-full flex-row">
      <div
        className={clsx(
          "relative h-full w-full grow basis-1/2 md:min-w-[28rem] md:basis-2/3",
          !isSmBreakpoint ? "hidden" : "block",
        )}
      >
        <PhotoPreview
          file={files[selectedFileIndex]}
          objectFit="object-cover"
        />

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

      <ConnectForm>
        {({ control, register, watch }) => (
          <div
            className="flex w-fit min-w-[12rem] basis-full flex-col gap-4 overflow-y-auto sm:basis-1/2
              md:basis-1/3"
          >
            <div className="flex flex-row items-center gap-2 px-4 pt-4">
              <div className="size-8">
                <ProfilePic photo={currentUser?.profilePic} />
              </div>
              <span>{currentUser?.name}</span>
            </div>

            <div className="flex w-full flex-col px-4">
              <Textarea
                rows={7}
                {...register("caption")}
                className="max-h-40 min-h-40 w-full resize-none overflow-auto bg-inherit"
              />
            </div>
            <div className="flex w-full flex-row items-center justify-between px-4">
              <Button className="-ml-1 p-1">
                <FaceSmileIcon className="size-6 dark:text-gray-300" />
              </Button>
              <span className="text-sm text-gray-800 dark:text-gray-500">
                {watch("caption")?.length || 0}/2500
              </span>
            </div>

            <div className="flex flex-col gap-4 px-4 pb-4">
              <Accordion title="Accessibility" className="flex flex-col gap-2">
                <p className="text-xs text-gray-800 dark:text-gray-400">
                  Alt text describes your photos for people with visual
                  impairments.
                </p>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex w-full flex-row gap-2">
                    <div className="size-12 shrink-0">
                      <PhotoPreview
                        file={files[index]}
                        objectFit="object-cover"
                      />
                    </div>
                    <Input
                      key={field.id}
                      name={`fileInfo.${index}.altText`}
                      register={register}
                      label=""
                    />
                  </div>
                ))}
              </Accordion>

              <Accordion
                title="Advanced settings"
                className="flex flex-col gap-4"
              >
                <div className="flex flex-row items-center justify-between gap-1">
                  <span>Hide like and view counts on this post</span>
                  <Controller
                    control={control}
                    name="hideLikes"
                    render={({ field: { onChange, value } }) => (
                      <Switch checked={value} onChange={onChange} />
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-between gap-2">
                  <span>Turn off commenting</span>
                  <Controller
                    control={control}
                    name="commentsOff"
                    render={({ field: { onChange, value } }) => (
                      <Switch checked={value} onChange={onChange} />
                    )}
                  />
                </div>
              </Accordion>
            </div>
          </div>
        )}
      </ConnectForm>
    </div>
  );
}
