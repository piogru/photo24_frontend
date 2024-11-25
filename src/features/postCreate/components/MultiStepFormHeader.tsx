import { Button, DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useFormActions from "../hooks/useFormActions";
import useFormState from "../hooks/useFormState";
import clsx from "clsx";

type MultiStepFormHeaderProps = {
  openDiscard: () => void;
};

export default function MultiStepFormHeader({
  openDiscard,
}: MultiStepFormHeaderProps) {
  const { stepNames, currentStepIndex } = useFormState();
  const actions = useFormActions();
  const isNavigationVisible = currentStepIndex > 0 && currentStepIndex <= 2;

  return (
    <div
      className="inline-flex h-10 w-full flex-row items-center justify-between border-b
        border-gray-100 px-2 text-center text-lg font-semibold dark:border-gray-900"
    >
      {isNavigationVisible ?
        <Button
          onClick={() => {
            if (currentStepIndex === 1) {
              openDiscard();
            } else {
              actions.prevStep();
            }
          }}
          className="p-2"
        >
          <ArrowLeftIcon className="size-6 dark:text-white" />
        </Button>
      : null}
      <DialogTitle className="mx-auto text-center text-lg font-semibold dark:border-gray-900">
        {stepNames[currentStepIndex]}
      </DialogTitle>
      {isNavigationVisible ?
        <>
          <Button
            type="submit"
            className={clsx(
              "px-2 py-1 text-base text-blue-500 hover:text-gray-700 dark:hover:text-gray-200",
              currentStepIndex === 2 ? "block" : "hidden",
            )}
          >
            {"Share"}
          </Button>
          <Button
            onClick={() => {
              actions.nextStep();
            }}
            className={clsx(
              "px-2 py-1 text-base text-blue-500 hover:text-gray-700 dark:hover:text-gray-200",
              currentStepIndex === 2 ? "hidden" : "block",
            )}
          >
            {"Next"}
          </Button>
        </>
      : null}
    </div>
  );
}
