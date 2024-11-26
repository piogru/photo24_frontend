import clsx from "clsx";
import { NavLink } from "react-router-dom";

type FeedNavigationProps = {
  variant: string;
};

export default function FeedNavigation({ variant }: FeedNavigationProps) {
  return (
    <div
      className="flex w-full flex-row items-center justify-start gap-3 border-b border-slate-300
        px-2 font-bold sm:px-0 dark:border-slate-600"
    >
      <NavLink to="?variant=for-you" end className="py-2">
        {({ isActive }) => (
          <span
            className={clsx(
              isActive && variant === "for-you" ?
                ""
              : "text-gray-400 dark:text-gray-700",
            )}
          >
            For you
          </span>
        )}
      </NavLink>
      <NavLink to="?variant=following" end className="py-2">
        {({ isActive }) => (
          <span
            className={clsx(
              isActive && variant === "following" ?
                ""
              : "text-gray-400 dark:text-gray-700",
            )}
          >
            Following
          </span>
        )}
      </NavLink>
    </div>
  );
}
