import { useContext } from "react";
import { useStore } from "zustand";
import { MultiStepFormContext } from "../components/MultiStepFormProvider";
import {
  MultiStepFormActions,
  MultiStepFormState,
} from "../types/multiStepFormState";

export default function useMultiStepStore<T>(
  selector: (state: MultiStepFormState & MultiStepFormActions) => T,
): T {
  const store = useContext(MultiStepFormContext);

  if (!store) {
    throw new Error("Missing MultiStepFormProvider");
  }

  return useStore(store, selector);
}
