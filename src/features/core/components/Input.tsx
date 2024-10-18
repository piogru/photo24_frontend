import InputProps from "../types/inputProps";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Input as HeadlessInput } from "@headlessui/react";

export default function Input({
  name,
  label,
  register,
  errorObject,
  ...rest
}: InputProps) {
  const error = errorObject && Object.keys(errorObject).length > 0;
  const ValidationMarkComponent = error ? XCircleIcon : CheckCircleIcon;

  return (
    <div className="group relative flex w-full flex-row items-center rounded-md border border-gray-300 has-[:focus]:border-gray-600 dark:border-gray-600 has-[:focus]:dark:border-gray-500">
      <HeadlessInput
        id={name}
        {...(register && register(name))}
        className="peer w-full text-ellipsis bg-inherit px-2.5 pb-2 pt-[15px] text-sm text-inherit ring-0 ring-inset focus:outline-none focus:ring-0"
        placeholder=""
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute start-[11px] top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:text-gray-600 dark:text-gray-500 peer-focus:dark:text-gray-400"
      >
        {label}
      </label>
      <ValidationMarkComponent
        className={`end-2 top-2.5 mx-2 block size-6 text-gray-400 peer-placeholder-shown:hidden peer-focus:hidden peer-aria-[invalid="true"]:text-red-600`}
      />
    </div>
  );
}
