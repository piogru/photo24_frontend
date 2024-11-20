import MultiStepFormProvider from "./MultiStepFormProvider";
import PostWizard from "./PostWizard";

type PostWizardWrapperProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function PostWizardWrapper({
  isOpen,
  setIsOpen,
}: PostWizardWrapperProps) {
  return (
    <MultiStepFormProvider
      initialState={{
        stepNames: ["Create new post", "Crop", "Share", "Sharing", "Complete"],
      }}
    >
      <PostWizard isOpen={isOpen} setIsOpen={setIsOpen} />
    </MultiStepFormProvider>
  );
}
