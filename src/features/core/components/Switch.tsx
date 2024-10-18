import { Switch as HeadlessSwitch } from "@headlessui/react";

type SwitchProps = {
  checked: boolean;
  onClick?: () => void;
  onChange?: () => void;
};

export default function Switch({ checked, onClick, onChange }: SwitchProps) {
  return (
    <HeadlessSwitch
      as="div"
      checked={checked}
      onClick={onClick}
      onChange={onChange}
      className="group inline-flex h-6 w-10 flex-shrink-0 items-center rounded-full bg-gray-300 transition data-[checked]:bg-gray-500 dark:bg-gray-600 dark:data-[checked]:bg-gray-200"
    >
      <span className="size-5 translate-x-0.5 rounded-full bg-white transition group-data-[checked]:translate-x-[1.125rem] dark:bg-gray-900" />
    </HeadlessSwitch>
  );
}
