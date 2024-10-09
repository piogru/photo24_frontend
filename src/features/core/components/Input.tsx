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
    <div
      className="
        relative w-full group flex flex-row items-center border rounded-md
      border-gray-300 dark:border-gray-600 has-[:focus]:border-gray-600 has-[:focus]:dark:border-gray-500
      "
    >
      <HeadlessInput
        id={name}
        {...(register && register(name))}
        className="peer px-2.5 pb-2 pt-[15px] w-full bg-inherit text-sm text-inherit text-ellipsis ring-0 ring-inset focus:outline-none focus:ring-0"
        placeholder=""
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]
        start-[11px] peer-focus:text-gray-600 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
      >
        {label}
      </label>
      <ValidationMarkComponent
        className={`block size-6 mx-2 top-2.5 end-2 peer-placeholder-shown:hidden peer-focus:hidden text-gray-400 peer-aria-[invalid="true"]:text-red-600`}
      />
    </div>
  );
}
