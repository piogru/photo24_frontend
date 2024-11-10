import { Button } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type ToastCloseButtonProps = {
  closeToast: (e: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
};

export default function ToastCloseButton({
  closeToast,
}: ToastCloseButtonProps) {
  return (
    <Button onClick={closeToast}>
      <XMarkIcon className="size-6" />
    </Button>
  );
}
