type ToastMessageProps = {
  title: string;
  text: string;
};

export default function ToastMessage({ title, text }: ToastMessageProps) {
  return (
    <div className="">
      <p className="">{title}</p>
      <p className="">{text}</p>
    </div>
  );
}
