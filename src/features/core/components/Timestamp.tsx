import { format, formatDistanceToNowStrict } from "date-fns";

type TimestampProps = {
  date: string | undefined;
  suffix?: boolean;
  fontSize?: "text-xs" | "text-sm" | "text-md" | "text-lg" | "text-xl";
};

export default function Timestamp({
  date,
  suffix = false,
  fontSize = "text-xs",
}: TimestampProps) {
  if (!date) {
    return null;
  }

  const title = format(date, "MMM dd, yyyy");
  const distance = formatDistanceToNowStrict(new Date(date), {
    addSuffix: suffix,
  });
  const formatDistance = (distance: string, suffix: boolean) => {
    if (suffix) {
      return distance;
    }

    const distanceSplit = distance.split(" ");

    return distanceSplit.length >= 1 ?
        `${distanceSplit[0]}${distanceSplit[1][0]}`
      : "";
  };

  return (
    <>
      {date ?
        <div
          title={title}
          className={`${fontSize} text-gray-800 dark:text-gray-400`}
        >
          {formatDistance(distance, suffix)}
        </div>
      : null}
    </>
  );
}
