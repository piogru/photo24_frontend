import { createContext, ReactNode, useState } from "react";
import { createStore, StoreApi } from "zustand";
import MultiStepFormState from "../types/multiStepFormState";

type MultiStepFormProviderProps = {
  initialState: number;
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
      bears: initialState,
      actions: {
        increase: (by) => set((state) => ({ bears: state.bears + by })),
        removeAllBears: () => set({ bears: 0 }),
      },
    })),
  );
  return (
    <MultiStepFormContext.Provider value={store}>
      {children}
    </MultiStepFormContext.Provider>
  );
}
