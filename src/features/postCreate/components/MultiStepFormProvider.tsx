import { createContext, ReactNode, useState } from "react";
import { createStore, StoreApi } from "zustand";
import {
  MultiStepFormActions,
  MultiStepFormState,
} from "../types/multiStepFormState";

type MultiStepFormProviderProps = {
  initialState: {
    stepNames: string[];
  };
  children: ReactNode;
};

export const MultiStepFormContext = createContext<StoreApi<
  MultiStepFormState & MultiStepFormActions
> | null>(null);

export default function MultiStepFormProvider({
  initialState,
  children,
}: MultiStepFormProviderProps) {
  const initialStateSnapshot: MultiStepFormState = {
    currentStepIndex: 0,
    direction: "forward",
    stepNames: initialState.stepNames,
  };

  const [store] = useState(() =>
    createStore<MultiStepFormState & MultiStepFormActions>((set) => ({
      ...initialStateSnapshot,

      actions: {
        prevStep: () => {
          set((state) => ({
            direction: "backward",
            currentStepIndex:
              state.currentStepIndex > 0 ?
                state.currentStepIndex - 1
              : state.currentStepIndex,
          }));
        },
        nextStep: () => {
          set((state) => ({
            direction: "forward",
            currentStepIndex:
              state.currentStepIndex < state.stepNames.length - 1 ?
                state.currentStepIndex + 1
              : state.currentStepIndex,
          }));
        },
        goToStep: (index) => {
          set((state) => {
            if (index >= 0 && index < state.stepNames.length) {
              return {
                direction:
                  index > state.currentStepIndex ? "forward" : "backward",
                currentStepIndex: index,
              };
            }
            return { currentStepIndex: state.currentStepIndex };
          });
        },
        reset: () => {
          set(initialStateSnapshot);
        },
      },
    })),
  );

  return (
    <MultiStepFormContext.Provider value={store}>
      {children}
    </MultiStepFormContext.Provider>
  );
}
