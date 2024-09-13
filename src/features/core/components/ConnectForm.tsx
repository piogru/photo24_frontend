import { ReactNode } from "react";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";

interface ConnectFormProps<TFieldValues extends FieldValues> {
  children(children: UseFormReturn<TFieldValues>): ReactNode;
}

export default function ConnectForm<TFieldValues extends FieldValues>({
  children,
}: ConnectFormProps<TFieldValues>) {
  const methods = useFormContext<TFieldValues>();

  return children({ ...methods });
}
