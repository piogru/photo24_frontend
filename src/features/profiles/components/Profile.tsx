import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
import clsx from "clsx";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import ProfileHeader from "./ProfileHeader";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookmarkIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const basePath = ":username/";
const generalTabs = [
  {
    name: "Posts",
    path: "",
    Icon: Squares2X2Icon,
  },
];
const userTabs = [
  {
    name: "Saved",
    path: "saved",
    Icon: BookmarkIcon,
  },
];

export default function Profile() {
  const { data: currentUser } = useCurrentUserQuery();
  const { pathname } = useLocation();
  const { username = "" } = useParams();
  const tabs = [
    ...generalTabs,
    ...(currentUser?.name === username ? userTabs : []),
  ];
  const selectedTabIndex = tabs.findIndex((item) =>
    matchPath(basePath + item.path, pathname),
  );

  return (
    <div className="w-full pt-12">
      <div className="mx-auto max-w-full md:max-w-5xl xl:max-w-5xl">
        <div className="flex flex-col gap-4 px-0 md:px-6">
          <ProfileHeader username={username} />

          <TabGroup
            manual
            selectedIndex={selectedTabIndex}
            className="border-t border-slate-300 dark:border-slate-600"
          >
            <TabList className="flex flex-row items-center justify-center text-center sm:gap-16">
              {tabs.map((item, index) => (
                <NavLink
                  end
                  key={item.name}
                  to={item.path}
                  role="tab"
                  aria-selected={index === selectedTabIndex ? "true" : "false"}
                  className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                      "flex h-12 flex-grow flex-row items-center justify-center gap-1 sm:flex-grow-0",
                      isActive ?
                        `-mt-[1px] border-t border-slate-700 text-blue-500 sm:text-gray-900
                          dark:border-slate-200 dark:sm:text-gray-100`
                      : "border-none text-gray-700 dark:text-gray-400",
                    )
                  }
                >
                  <item.Icon className="size-6 sm:size-4" />
                  <span className="sr-only text-sm font-semibold uppercase sm:not-sr-only">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((item) => (
                <TabPanel key={item.name}>
                  <Outlet />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
