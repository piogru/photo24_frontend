import { useEffect, useState } from "react";
import { Button, Textarea } from "@headlessui/react";
import {
  MagnifyingGlassPlusIcon,
  ChevronUpDownIcon,
  Square2StackIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { StageName } from "../types/stageName";
import Accordion from "../../core/components/Accordion";
import PhotoPreview from "./PhotoPreview";
import Input from "../../core/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type PhotoEditProps = {
  files: File[];
  stage: StageName;
};

type FileTemp = {
  key: number;
  file: File;
};

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

const schema = z
  .object({
    userId: z.string(),
    password: z.string(),
  })
  .required();

export default function PhotoEdit({ files, stage }: PhotoEditProps) {
  const [fileArray, setFileArray] = useState<FileTemp[]>([]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [fileDescriptions, setFileDescriptions] = useState([]);

  useEffect(() => {
    const arr = Array.from(files).map((item, idx) => ({
      key: idx,
      file: item,
    }));

    setFileArray(arr);
  }, [files]);

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-full h-full relative basis-[28rem] grow">
        <PhotoPreview
          file={files[selectedFileIndex]}
          objectFit="object-cover"
        />

        {stage === "crop" ?
          <div className="absolute bottom-0 px-4 mb-3 w-full flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row gap-4">
              <Button className={buttonStyle}>
                <ChevronUpDownIcon className="size-8 rotate-45" />
                <span className="sr-only">Crop</span>
              </Button>
              <Button className={buttonStyle}>
                <MagnifyingGlassPlusIcon className="size-6" />
                <span className="sr-only">Zoom</span>
              </Button>
            </div>
            <Button className={buttonStyle}>
              <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
              <span className="sr-only">Items</span>
            </Button>
          </div>
        : null}
        {selectedFileIndex != 0 ?
          <Button
            onClick={() => {
              const newSelectedIndex = selectedFileIndex - 1;
              if (newSelectedIndex >= 0) {
                setSelectedFileIndex(newSelectedIndex);
              }
            }}
            className={`${buttonStyle} absolute top-1/2 bottom-1/2 left-2`}
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
            className={`${buttonStyle} absolute top-1/2 bottom-1/2 right-2`}
          >
            <ChevronRightIcon className="size-6" />
          </Button>
        : null}
        {fileArray.length > 1 ?
          <div className="absolute bottom-0 mb-3 w-full inline-flex flex-row justify-center items-center gap-2">
            {Array.from(fileArray).map((item, idx) => (
              <div
                key={item.key}
                className={`size-2 rounded-full ${selectedFileIndex === idx ? "bg-blue-500" : "bg-gray-400"}`}
              />
            ))}
          </div>
        : null}
      </div>

      {stage !== "crop" ?
        <div className="basis-80 w-full flex flex-col gap-4 overflow-auto">
          <div className="px-4 pt-4 flex flex-row items-center gap-2">
            <div className="size-8 rounded-full bg-gray-500"></div>
            <div>Account name</div>
          </div>

          <div className="w-full flex flex-col">
            <div className="overflow-auto">
              <div className="w-full px-4">
                <Textarea
                  rows={7}
                  className="w-full min-h-40 max-h-40 bg-inherit resize-none"
                />
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between px-4">
              <Button className="-ml-1 p-1">
                <FaceSmileIcon className="size-6 dark:text-gray-300" />
              </Button>
              <span className="text-sm text-gray-800 dark:text-gray-500">
                0/2200
              </span>
            </div>
          </div>

          <div className="px-4 pb-4 flex flex-col gap-4">
            <Accordion title="Accessibility" className="flex flex-col gap-2">
              <p className="text-xs text-gray-800 dark:text-gray-400">
                Alt text describes your photos for people with visual
                impairments.
              </p>
              {fileArray.map((item) => (
                <div key={item.key} className="w-full flex flex-row gap-2">
                  <div className="w-fit size-12">
                    <PhotoPreview file={item.file} objectFit="object-cover" />
                  </div>
                  <Input name="asdf" label="fdsa" />
                </div>
              ))}
            </Accordion>

            {/* <Accordion title="Advanced settings" className="flex flex-col gap-2">
              <div>
                <span>Hide like and view counts on this post</span>
                <Switch />
              </div>
              <div>
                <span>Turn off commenting</span>
                <Switch />
              </div>
            </Accordion> */}
          </div>
        </div>
      : null}
    </div>
  );
}
