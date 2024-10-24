import { ReactNode } from "react";
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DropzoneRootProps } from "react-dropzone";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  getRootProps?: <T extends DropzoneRootProps>(props: T) => T;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  getRootProps = (props) => props,
  children,
}: ModalProps) {
  return (
    <Dialog
      {...getRootProps({
        open: isOpen,
        onClose: onClose,
        role: "dialog",
        className: "relative z-50 text-gray-900 dark:text-gray-200",
      })}
    >
      <DialogBackdrop
        onDragOver={(event) => {
          event.preventDefault();
        }}
        transition
        className="fixed inset-0 bg-black/30 duration-150 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center pb-4 pt-14 md:p-4">
        <Button
          title="Close"
          onClick={onClose}
          className="absolute right-1 top-1 p-1 sm:right-2 sm:top-2"
        >
          <XMarkIcon className="size-7 stroke-2 font-bold text-black dark:text-white" />
        </Button>
        <DialogPanel
          className={`flex w-full max-w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl
            duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0
            sm:max-w-fit dark:bg-gray-800`}
        >
          {title ? title : null}
          <div className="h-full max-h-[calc(100vh-theme(space.20))] w-full">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
