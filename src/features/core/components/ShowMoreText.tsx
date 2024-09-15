import { useState } from "react";

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
      {showMore ? text : text.substring(0, overflowLength)}
      {""}
      {text.length > overflowLength ?
        <button
          onClick={() => {
            setShowMore;
          }}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      : null}
    </p>
  );
}
