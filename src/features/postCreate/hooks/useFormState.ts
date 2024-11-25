import { useShallow } from "zustand/shallow";
import useMultiStepStore from "./useMultiStepStore";

export default function useFormState() {
  return useMultiStepStore(
    useShallow((state) => ({
      currentStepIndex: state.currentStepIndex,
      direction: state.direction,
      stepNames: state.stepNames,
    })),
  );
}
