import { Button } from "@headlessui/react";

export default function RecommendedUsers() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Suggested for you
      </span>

      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="mx-2 flex flex-row justify-between items-center"
        >
          <div className="flex flex-row items-center gap-3">
            <div className="size-10 rounded-full bg-gray-500" />
            <span>Acc name</span>
          </div>

          <Button className="text-xs font-semibold text-blue-500 hover:text-gray-700 dark:hover:text-gray-200">
            Follow
          </Button>
        </div>
      ))}
    </div>
  );
}
