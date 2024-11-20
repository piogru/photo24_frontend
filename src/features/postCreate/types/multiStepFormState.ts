import { UseFormReturn } from "react-hook-form";

export default interface MultiStepFormState {
  currentStepIndex: number;
  direction: "forward" | "backward";
  stepNames: string[];
  form: UseFormReturn;

  actions: {
    prevStep: () => void;
    nextStep: () => void;
    goToStep: (index: number) => void;
  };
}
