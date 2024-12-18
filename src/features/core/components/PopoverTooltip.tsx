import { Fragment, ReactNode, useRef } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  Transition,
} from "@headlessui/react";

type PopoverTooltipProps = PopoverPanelProps & {
  className?: string;
  timeoutDuration?: number;
  label: string;
  children: ReactNode;
};

export default function PopoverTooltip({
  label,
  anchor = "bottom",
  timeoutDuration = 100,
  className = "",
  children,
}: PopoverTooltipProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  const handleEnter = (isOpen: boolean) => {
    clearTimeout(timeOutRef.current);
    !isOpen && triggerRef.current?.click();
  };

  const handleLeave = (isOpen: boolean) => {
    timeOutRef.current = setTimeout(() => {
      isOpen && triggerRef.current?.click();
    }, timeoutDuration);
  };

  return (
    <Popover className={`relative w-fit ${className}`}>
      {({ open }) => (
        <div
          onMouseEnter={() => handleEnter(open)}
          onMouseLeave={() => handleLeave(open)}
          onFocus={() => handleEnter(open)}
          onBlur={() => handleLeave(open)}
          className="w-fit"
        >
          <PopoverButton as="div" ref={triggerRef}>
            {children}
          </PopoverButton>
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
              className="flex flex-col whitespace-pre-line rounded-xl bg-gray-200 p-2 text-gray-900
                dark:bg-gray-600 dark:text-gray-200"
            >
              {label}
            </PopoverPanel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}
