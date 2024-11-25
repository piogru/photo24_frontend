export type MultiStepFormState = {
  currentStepIndex: number;
  direction: "forward" | "backward";
  stepNames: string[];
};

export type MultiStepFormActions = {
  actions: {
    prevStep: () => void;
    nextStep: () => void;
    goToStep: (index: number) => void;
    reset: () => void;
  };
};
