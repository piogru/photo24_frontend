import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import User from "../../core/types/user";
import { NavLink, Outlet } from "react-router-dom";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import { BookmarkIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ShowMoreText from "../../core/components/ShowMoreText";
import useFollowQuery from "../../core/hooks/useFollowQuery";
import Follow from "../../core/types/follow";
import useFollowMutation from "../../core/hooks/useFollowMutation";
import useUnfollowMutation from "../../core/hooks/useUnfollowMutation";
import ProfilePic from "../../core/components/ProfilePic";

type ProfileProps = {
  user: User;
  follow: Follow | null;
};

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

export default function Profile({ user }: ProfileProps) {
  const { data: currentUser } = useCurrentUserQuery();
  const { data: follow } = useFollowQuery(user._id);
  const followMutation = useFollowMutation(user._id);
  const unfollowMutation = useUnfollowMutation(user._id);

  const tabs = [
    ...generalTabs,
    ...(user._id === currentUser?._id ? userTabs : []),
  ];

  const onFollowClick = () => {
    if (follow) {
      unfollowMutation.mutate(user._id);
    } else {
      followMutation.mutate(user._id);
    }
  };

  return (
    <div className="w-full pt-12">
      <div className="mx-auto max-w-full md:max-w-5xl xl:max-w-5xl">
        <div className="flex flex-col px-0 md:px-6 gap-4">
          <header className="grid grid-cols-[76px_4fr] sm:grid-cols-[120px_4fr] md:grid-cols-[1fr_2fr] justify-items-start items-start gap-4 mx-4">
            <section className="md:justify-self-center row-start-1 sm:row-end-4 md:row-end-5 mr-2 md:mr-6">
              <div className="size-16 sm:size-24 md:size-40">
                <ProfilePic photo={user?.profilePic} />
              </div>
            </section>

            <section className="row-start-1 col-start-2">
              <div className="flex flex-row justify-start sm:justify-center items-center gap-4 flex-wrap">
                <div className="text-xl">{user.name}</div>
                <div className="flex flex-row items-center gap-2">
                  {user._id !== currentUser?._id ?
                    <Button
                      onClick={onFollowClick}
                      className="px-4 py-1 rounded-lg bg-gray-700"
                    >
                      {follow ? "Following" : "Follow"}
                    </Button>
                  : null}
                </div>
              </div>
            </section>

            <section className="row-start-2 col-start-1 sm:col-start-2">
              <div className="flex flex-row gap-4 md:gap-8">
                <div>
                  <span className="font-semibold">{user.posts}</span>
                  {" posts"}
                </div>
                <div>
                  <span className="font-semibold">{user.followers}</span>
                  {" followers"}
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span>
                  {" following"}
                </div>
              </div>
            </section>

            <section className="row-start-3 sm:row-start-4 md:row-start-3 row-end-4 md:row-end-3 col-start-1 md:col-start-2 col-end-3 md:col-end-2 leading-none whitespace-pre-line">
              <div>
                <ShowMoreText
                  text={user.description}
                  overflowLength={250}
                  textSize="text-sm"
                />
              </div>
            </section>
          </header>

          <TabGroup
            manual
            className="border-t border-slate-300 dark:border-slate-600"
          >
            <TabList className="flex flex-row justify-center items-center text-center sm:gap-16">
              {tabs.map((item) => (
                <NavLink
                  end
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex flex-row justify-center items-center h-12 flex-grow sm:flex-grow-0 ${
                      isActive ?
                        "-mt-[1px] border-t border-slate-700 dark:border-slate-200 text-blue-500 sm:text-gray-900 dark:sm:text-gray-100"
                      : "border-none text-gray-700 dark:text-gray-400 "
                    }`
                  }
                >
                  <Tab className="flex flex-row justify-start items-center gap-1">
                    <item.Icon className="size-6 sm:size-4" />
                    <span className="sr-only sm:not-sr-only uppercase font-semibold text-sm">
                      {item.name}
                    </span>
                  </Tab>
                </NavLink>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((item) => (
                <TabPanel key={item.path}>
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
