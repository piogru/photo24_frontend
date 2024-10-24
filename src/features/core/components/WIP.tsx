import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function WIP() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
      <ExclamationTriangleIcon className="size-12 text-gray-800 dark:text-gray-400" />
      <span>Coming soon...</span>
    </div>
  );
}
