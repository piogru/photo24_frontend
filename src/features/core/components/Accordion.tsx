import { ReactNode } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type AccordionProps = {
  title: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function Accordion({
  title,
  className,
  children,
}: AccordionProps) {
  return (
    <Disclosure>
      <DisclosureButton className="group flex flex-row justify-between items-center gap-2 font-normal data-[open]:font-semibold">
        {title}
        <ChevronDownIcon className="w-5 group-data-[open]:rotate-180" />
      </DisclosureButton>
      <DisclosurePanel className={className}>{children}</DisclosurePanel>
    </Disclosure>
  );
}
