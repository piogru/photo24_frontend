import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function Modal({ isOpen, setIsOpen }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Dialog title</DialogTitle>
          <Description>Description</Description>
          <p>Main text</p>
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={() => setIsOpen(false)}>Confirm</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
