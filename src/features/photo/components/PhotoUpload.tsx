import Modal from "../../core/components/Modal";

type PhotoUploadProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function PhotoUpload({ isOpen, setIsOpen }: PhotoUploadProps) {
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen} />;
}
