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
import ProfilePicInput from "./ProfilePicInput";
import useUsersByUsernameQuery from "../../core/hooks/useUsersByUsernameQuery";
import clsx from "clsx";

type ProfileProps = {
  initialData: {
    user: User;
    follow: Follow | null;
  };
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

export default function Profile({ initialData }: ProfileProps) {
  const { data: currentUser } = useCurrentUserQuery();
  const { data: queriedUsers } = useUsersByUsernameQuery(
    initialData.user.name,
    false,
    [initialData.user],
  );
  const user = queriedUsers[0];
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
        <div className="flex flex-col gap-4 px-0 md:px-6">
          <header
            className="mx-4 grid grid-cols-[76px_4fr] items-start justify-items-start gap-4
              sm:grid-cols-[120px_4fr] md:grid-cols-[1fr_2fr]"
          >
            <section className="row-start-1 mr-2 sm:row-end-4 md:row-end-5 md:mr-6 md:justify-self-center">
              <div className="relative size-16 sm:size-24 md:size-40">
                <ProfilePic photo={user?.profilePic} />
                {currentUser?._id === user._id ?
                  <ProfilePicInput />
                : null}
              </div>
            </section>

            <section className="col-start-2 row-start-1">
              <div className="flex flex-row flex-wrap items-center justify-start gap-4 sm:justify-center">
                <h2 className="text-xl">{user.name}</h2>
                <div className="flex flex-row items-center gap-2">
                  {user._id !== currentUser?._id ?
                    <Button
                      onClick={onFollowClick}
                      className="rounded-lg bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400
                        dark:bg-gray-700 dark:hover:bg-gray-800"
                    >
                      {follow ? "Following" : "Follow"}
                    </Button>
                  : null}
                </div>
              </div>
            </section>

            <section className="col-start-1 row-start-2 sm:col-start-2">
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

            <section
              className="col-start-1 col-end-3 row-start-3 row-end-4 whitespace-pre-line leading-none
                sm:row-start-4 md:col-start-2 md:col-end-2 md:row-start-3 md:row-end-3"
            >
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
            <TabList className="flex flex-row items-center justify-center text-center sm:gap-16">
              {tabs.map((item) => (
                <NavLink
                  end
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    clsx(
                      "flex h-12 flex-grow flex-row items-center justify-center sm:flex-grow-0",
                      isActive ?
                        `-mt-[1px] border-t border-slate-700 text-blue-500 sm:text-gray-900
                          dark:border-slate-200 dark:sm:text-gray-100`
                      : "border-none text-gray-700 dark:text-gray-400",
                    )
                  }
                >
                  <Tab className="flex flex-row items-center justify-start gap-1">
                    <item.Icon className="size-6 sm:size-4" />
                    <span className="sr-only text-sm font-semibold uppercase sm:not-sr-only">
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
