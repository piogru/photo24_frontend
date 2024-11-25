import { Button, DialogTitle } from "@headlessui/react";
import Modal from "../../core/components/Modal";

type DiscardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDiscard: () => void;
};

export default function DiscardDialog({
  isOpen,
  onClose,
  onDiscard,
}: DiscardDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-4 sm:w-96">
        <div className="mb-4 mt-6 flex flex-col items-center gap-1 text-center">
          <DialogTitle className="text-xl font-semibold">
            Discard post?
          </DialogTitle>
          <p className="text-sm text-gray-800 dark:text-gray-400">
            {"If you leave, your edits won't be saved"}
          </p>
        </div>
        <div className="flex w-full flex-col items-center">
          <Button
            autoFocus
            onClick={onDiscard}
            className="w-full border-t border-slate-300 py-3 font-semibold text-red-500
              dark:border-slate-600"
          >
            Discard
          </Button>
          <Button
            onClick={onClose}
            className="w-full border-t border-slate-300 py-3 dark:border-slate-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
