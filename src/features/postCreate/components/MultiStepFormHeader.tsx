import { Button, DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import useFormActions from "../hooks/useFormActions";
import useFormState from "../hooks/useFormState";

type MultiStepFormHeaderProps = {
  children?: ReactNode;
};

export default function MultiStepFormHeader({
  children,
}: MultiStepFormHeaderProps) {
  const { stepNames, currentStepIndex } = useFormState();
  const actions = useFormActions();

  return (
    <div>
      <DialogTitle
        className="inline-flex w-full flex-row items-center justify-between border-b
          border-gray-100 px-3 py-1 text-center text-lg font-semibold dark:border-gray-900"
      >
        <Button onClick={() => actions.prevStep()}>
          <ArrowLeftIcon className="size-6 dark:text-white" />
        </Button>
        <span className="mx-auto">{stepNames[currentStepIndex]}</span>
        <Button
          onClick={() => actions.nextStep()}
          className="text-base text-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Next
        </Button>
      </DialogTitle>
    </div>
  );
}
