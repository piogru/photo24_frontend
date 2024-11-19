export default interface MultiStepFormState {
  bears: number;
  actions: { increase: (by: number) => void; removeAllBears: () => void };
}
