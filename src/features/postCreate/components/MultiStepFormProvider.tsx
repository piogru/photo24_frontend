import { createContext, ReactNode, useState } from "react";
import { createStore, StoreApi } from "zustand";
import MultiStepFormState from "../types/multiStepFormState";

type MultiStepFormProviderProps = {
  initialState: {
    stepNames: string[];
  };
  children: ReactNode;
};

export const MultiStepFormContext =
  createContext<StoreApi<MultiStepFormState> | null>(null);

export default function MultiStepFormProvider({
  initialState,
  children,
}: MultiStepFormProviderProps) {
  const [store] = useState(() =>
    createStore<MultiStepFormState>((set) => ({
      currentStepIndex: 0,
      direction: "forward",
      stepNames: initialState.stepNames,

      actions: {
        prevStep: () => {
          set((state) => ({
            currentStepIndex:
              state.currentStepIndex > 0 ?
                state.currentStepIndex - 1
              : state.currentStepIndex,
          }));
        },
        nextStep: () => {
          set((state) => ({
            currentStepIndex:
              state.currentStepIndex < state.stepNames.length - 1 ?
                state.currentStepIndex + 1
              : state.currentStepIndex,
          }));
        },
        goToStep: (index) => {
          set((state) => {
            if (index >= 0 && index < state.stepNames.length) {
              return { currentStepIndex: index };
            }
            return { currentStepIndex: state.currentStepIndex };
          });
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
