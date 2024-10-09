import { useState } from "react";
import { Button } from "@headlessui/react";

type ShowMoreTextProps = {
  text: string;
  overflowLength?: number;
  textSize?:
    | "text-xs"
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl";
};

export default function ShowMoreText({
  text,
  overflowLength = 250,
  textSize = "text-md",
}: ShowMoreTextProps) {
  const [showMore, setShowMore] = useState(false);
  const isOverflow = text.length > overflowLength;

  return (
    <>
      {text ?
        <p className={`inline ${textSize}`}>
          {isOverflow ?
            <>
              {showMore ?
                text
              : `${text.substring(0, overflowLength).trimEnd()}...`}
            </>
          : <>{text}</>}
          {text.length > overflowLength ?
            <>
              {" "}
              <Button
                onClick={() => {
                  setShowMore(!showMore);
                }}
                className={`text-gray-700 dark:text-gray-400 ${textSize}`}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            </>
          : null}
        </p>
      : null}
    </>
  );
}
