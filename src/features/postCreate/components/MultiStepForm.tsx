import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import MultiStepFormStep from "./MultiStepFormStep";
import MultiStepFormHeader from "./MultiStepFormHeader";
import StepProps from "../types/stepProps";
import AnimatedStep from "./AnimatedStep";
import useFormState from "../hooks/useFormState";
import { FieldValues, useFormContext } from "react-hook-form";

type MultiStepFormProps = {
  onSubmit: (data: FieldValues) => Promise<void>;
  children: ReactNode;
};
export default function MultiStepForm({
  onSubmit,
  children,
}: MultiStepFormProps) {
  const { currentStepIndex, direction } = useFormState();
  const form = useFormContext();
  const header = useMemo(() => {
    return Children.toArray(children).find(
      (child) => isValidElement(child) && child.type === MultiStepFormHeader,
    );
  }, [children]);
  const steps = useMemo(() => {
    return Children.toArray(children).filter(
      (child): child is ReactElement<StepProps> =>
        isValidElement(child) && child.type === MultiStepFormStep,
    );
  }, [children]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex size-full grow flex-col overflow-hidden"
    >
      {header}

      <div className="relative flex size-full grow flex-col transition-transform duration-500">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;

          return (
            <AnimatedStep
              key={step.props.name}
              index={index}
              currentIndex={currentStepIndex}
              direction={direction}
              isActive={isActive}
            >
              {step}
            </AnimatedStep>
          );
        })}
      </div>
    </form>
  );
}
