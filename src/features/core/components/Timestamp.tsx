import { format, formatDistanceToNowStrict } from "date-fns";

type TimestampProps = {
  date: string | undefined;
  suffix?: boolean;
};

export default function Timestamp({ date, suffix = false }: TimestampProps) {
  const title = format(date || "", "MMM dd, yyyy");
  const distance = formatDistanceToNowStrict(new Date(date || ""), {
    addSuffix: suffix,
  });

  const formatDistance = (distance: string, suffix: boolean) => {
    if (!suffix) {
      return distance;
    }

    const distanceSplit = distance.split(" ");

    return distanceSplit.length >= 1 ?
        `${distanceSplit[0]} ${distanceSplit[1][0]}`
      : "";
  };

  if (!date) {
    return null;
  }

  return (
    <div title={title} className="text-xs text-gray-800 dark:text-gray-400">
      {formatDistance(distance, suffix)}
    </div>
  );
}
