import useMultiStepStore from "./useMultiStepStore";

export default function useFormTest() {
  return useMultiStepStore((state) => state.bears);
}
