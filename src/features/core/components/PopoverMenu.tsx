import { Fragment, ReactNode } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  Transition,
} from "@headlessui/react";

type PopoverMenuProps = PopoverPanelProps & {
  className?: string;
  buttonContent?: ReactNode;
  children: ReactNode;
};

export default function PopoverMenu({
  className,
  buttonContent,
  anchor = "bottom",
  children,
}: PopoverMenuProps) {
  return (
    <Popover className={`relative ${className}`}>
      <PopoverButton>{buttonContent}</PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor={anchor}
          className="flex flex-col rounded-xl bg-white shadow-lg [--anchor-gap:4px] dark:bg-gray-800/90"
        >
          {children}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
