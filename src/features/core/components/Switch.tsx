import { Switch as HeadlessSwitch } from "@headlessui/react";

type SwitchProps = {
  enabled: boolean;
  onClick: () => void;
};

export default function Switch({ enabled, onClick }: SwitchProps) {
  return (
    <HeadlessSwitch
      as="div"
      checked={enabled}
      onClick={onClick}
      className="group inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition data-[checked]:bg-gray-400"
    >
      <span className="size-3.5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-[1.125rem] group-data-[checked]:bg-gray-900" />
    </HeadlessSwitch>
  );
}
