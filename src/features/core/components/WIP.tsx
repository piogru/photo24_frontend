import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function WIP() {
  return (
    <div className="p-2 w-full h-full flex flex-col justify-center items-center gap-1">
      <ExclamationTriangleIcon className="size-12 text-gray-800 dark:text-gray-400" />
      <span>Coming soon...</span>
    </div>
  );
}
