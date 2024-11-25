import { useEffect, useState } from "react";

type PhotoPreviewProps = {
  file: File;
  objectFit?:
    | "object-contain"
    | "object-cover"
    | "object-fill"
    | "object-none"
    | "object-scale-down";
};

export default function PhotoPreview({
  file,
  objectFit = "object-none",
}: PhotoPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    const objectUrl = file ? URL.createObjectURL(file) : "";
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <>
      {preview && (
        <img src={preview} className={`h-full w-full ${objectFit}`} />
      )}
    </>
  );
}
