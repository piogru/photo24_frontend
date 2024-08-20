import type { ComponentPropsWithoutRef } from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { ZodAny } from "zod";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  name: string;
  register: UseFormRegister<FieldValues>;
  label: string;
  errorObject?: FieldError | Merge<FieldError, FieldErrorsImpl<ZodAny>>;
};

export default InputProps;
