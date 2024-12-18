import { ReactNode } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";

type DrawerProps = {
  isOpen: boolean;
  position?: string;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({
  isOpen = false,
  title,
  position,
  onClose,
  children,
}: DrawerProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-[5] text-gray-900 dark:text-gray-200"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={clsx(
              "fixed inset-y-0 mb-12 flex w-full max-w-full sm:mb-0 sm:w-fit",
              position ? position : "left-0",
            )}
          >
            <DialogPanel
              transition
              className={`sm:duration-400 pointer-events-auto relative w-screen max-w-full translate-x-0
                rounded-none border-e border-slate-300 bg-white transition duration-300
                ease-in-out data-[closed]:-translate-x-full sm:max-w-sm sm:rounded-e-xl
                dark:border-slate-600 dark:bg-gray-900`}
            >
              <div className="flex h-full flex-col overflow-y-auto py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-2xl font-semibold leading-6">
                    {title}
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1">{children}</div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
