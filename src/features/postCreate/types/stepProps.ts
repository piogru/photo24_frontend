import { ReactNode } from "react";

type StepProps = {
  name: string;
  children: ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export default StepProps;
