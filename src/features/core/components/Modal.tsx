import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { DragEvent, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  onDrop?: (event: DragEvent) => void;
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  onDrop,
  onDragEnter,
  onDragLeave,
  children,
}: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      onDragOver={
        onDrop ?
          (event) => {
            event.preventDefault();
          }
        : undefined
      }
      onDrop={onDrop ? (event) => onDrop(event) : undefined}
      onDragEnter={onDragEnter ? (event) => onDragEnter(event) : undefined}
      onDragLeave={onDragLeave ? (event) => onDragLeave(event) : undefined}
      className="relative z-50 text-gray-900 dark:text-gray-200"
    >
      <DialogBackdrop
        onDragOver={(event) => {
          event.preventDefault();
          console.log("backdrop dragover");
        }}
        transition
        className="fixed inset-0 bg-black/30 duration-150 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Button onClick={onClose} className="absolute top-2 right-2 p-1">
          <XMarkIcon className="size-8 stroke-2 font-bold text-black dark:text-white" />
        </Button>
        <DialogPanel className="max-w-lg rounded-xl shadow-xl bg-white dark:bg-gray-800  duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0">
          {title ? title : null}
          <div className="w-full h-full">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
