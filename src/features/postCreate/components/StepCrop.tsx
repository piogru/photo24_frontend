import PopoverMenu from "../../core/components/PopoverMenu";
import {
  ChevronUpDownIcon,
  MagnifyingGlassPlusIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import WIP from "../../core/components/WIP";
import { useFormContext } from "react-hook-form";
import { TPostSchema } from "../postSchema";
import PostWizardPhotos from "./PostWizardPhotos";

const buttonStyle =
  "size-10 flex justify-center items-center rounded-full text-gray-200 bg-gray-800 hover:bg-gray-800/50 transition";

export default function StepCrop() {
  const { getValues } = useFormContext<TPostSchema>();
  const files = getValues("files");

  return (
    <div className="flex h-full w-full flex-row">
      <div className="relative h-full w-full grow basis-full md:min-w-[28rem]">
        <PostWizardPhotos files={files} />

        <div
          className="absolute bottom-0 mb-3 flex w-full flex-row items-center justify-between gap-4
            px-4"
        >
          <div className="flex flex-row gap-4">
            <PopoverMenu
              anchor={"bottom start"}
              buttonContent={
                <div className={buttonStyle}>
                  <ChevronUpDownIcon className="size-8 rotate-45" />
                  <span className="sr-only">Crop</span>
                </div>
              }
            >
              <WIP />
            </PopoverMenu>
            <PopoverMenu
              anchor={"bottom start"}
              buttonContent={
                <div className={buttonStyle}>
                  <MagnifyingGlassPlusIcon className="size-6" />
                  <span className="sr-only">Zoom</span>
                </div>
              }
            >
              <WIP />
            </PopoverMenu>
          </div>
          <PopoverMenu
            anchor={"bottom end"}
            buttonContent={
              <div className={buttonStyle}>
                <Square2StackIcon className="size-6 scale-x-[-1] scale-y-[-1]" />
                <span className="sr-only">Items</span>
              </div>
            }
          >
            <WIP />
          </PopoverMenu>
        </div>
      </div>
    </div>
  );
}
