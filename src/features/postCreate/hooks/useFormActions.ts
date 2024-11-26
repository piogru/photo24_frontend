import { useShallow } from "zustand/shallow";
import useMultiStepStore from "./useMultiStepStore";

export default function useFormActions() {
  return useMultiStepStore(
    useShallow((state) => ({
      ...state.actions,
    })),
  );
}
