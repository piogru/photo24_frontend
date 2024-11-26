import StepProps from "../types/stepProps";

export default function MultiStepFormStep({ children }: StepProps) {
  return (
    <div
      className="flex h-[calc(min(30rem,_100vh-theme(space.20)))] w-full flex-col items-center
        justify-center rounded-b-xl transition"
    >
      {children}
    </div>
  );
}
