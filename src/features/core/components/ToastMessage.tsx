type ToastMessageProps = {
  title?: string;
  text: string;
};

export default function ToastMessage({ title, text }: ToastMessageProps) {
  return (
    <div className="w-fit">
      {title ?
        <p className="">{title}</p>
      : null}
      <p className="">{text}</p>
    </div>
  );
}
