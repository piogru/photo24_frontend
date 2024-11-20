export default interface MultiStepFormState {
  currentStepIndex: number;
  direction: "forward" | "backward";
  stepNames: string[];

  actions: {
    prevStep: () => void;
    nextStep: () => void;
    goToStep: (index: number) => void;
  };
}
