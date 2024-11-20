import { Button, DialogTitle } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import useFormActions from "../hooks/useFormActions";
import useFormState from "../hooks/useFormState";

type MultiStepFormHeaderProps = {
  openDiscard: () => void;
};

export default function MultiStepFormHeader({
  openDiscard,
}: MultiStepFormHeaderProps) {
  const { stepNames, currentStepIndex } = useFormState();
  const actions = useFormActions();

  return (
    <div>
      <DialogTitle
        className="inline-flex w-full flex-row items-center justify-between border-b
          border-gray-100 px-3 py-1 text-center text-lg font-semibold dark:border-gray-900"
      >
        {currentStepIndex > 0 ?
          <Button
            onClick={() => {
              if (currentStepIndex === 1) {
                openDiscard();
              } else {
                actions.prevStep();
              }
            }}
          >
            <ArrowLeftIcon className="size-6 dark:text-white" />
          </Button>
        : null}
        <span className="mx-auto">{stepNames[currentStepIndex]}</span>
        {currentStepIndex > 0 ?
          <Button
            onClick={() => actions.nextStep()}
            className="text-base text-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
          >
            {currentStepIndex === 2 ? "Share" : "Next"}
          </Button>
        : null}
      </DialogTitle>
    </div>
  );
}
