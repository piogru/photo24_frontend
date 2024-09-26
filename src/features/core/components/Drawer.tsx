import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ReactNode } from "react";

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
      className="relative z-10 text-gray-900 dark:text-gray-200"
    >
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`fixed inset-y-0 flex max-w-full ${position ? position : "left-0"}`}
          >
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md bg-white dark:bg-gray-900 rounded-xl
              transition ease-in-out duration-300 sm:duration-400 translate-x-0 data-[closed]:-translate-x-full
              border-t border-slate-300 dark:border-slate-600
            "
            >
              <div className="flex h-full flex-col overflow-y-auto py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-2xl font-semibold leading-6 ">
                    {title}
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {children}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
