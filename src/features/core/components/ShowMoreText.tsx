import { useState } from "react";
import { Button } from "@headlessui/react";

type ShowMoreTextProps = {
  text: string;
  overflowLength?: number;
};

export default function ShowMoreText({
  text,
  overflowLength = 250,
}: ShowMoreTextProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <p className="inline">
      {showMore ? text : `${text.substring(0, overflowLength)}...`}
      {text.length > overflowLength ?
        <>
          {" "}
          <Button
            onClick={() => {
              setShowMore(!showMore);
            }}
            className="text-gray-700 dark:text-gray-400"
          >
            {showMore ? "Show less" : "Show more"}
          </Button>
        </>
      : null}
    </p>
  );
}
