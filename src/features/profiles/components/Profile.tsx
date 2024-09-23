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
import DefaultProfilePic from "../../core/components/DefaultProfilePic";

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

  const onFollowersClick = () => {};

  const onFollowingClick = () => {};

  return (
    <div className="w-full pt-12">
      <div className="mx-auto max-w-[90%]">
        <div className="flex flex-col px-6 gap-2">
          <div className="flex flex-row gap-6">
            <div className="p-12">
              {user?.profilePic ?
                <img src="size-36 object-cover" />
              : <DefaultProfilePic />}
            </div>

            <div className="flex flex-col items-start gap-4">
              <section className="flex flex-row justify-center items-center gap-4 pb-2">
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
              </section>
              <section className="flex flex-row gap-8">
                <div>{`${user.posts} Posts`}</div>
                <Button onClick={onFollowersClick}>
                  <div>{`${user.followers} Followers`}</div>
                </Button>
                <Button onClick={onFollowingClick}>
                  <div>{`${user.following} Following`}</div>
                </Button>
              </section>
              <section className="leading-none whitespace-pre-line">
                <ShowMoreText
                  text={user.description}
                  overflowLength={250}
                  textSize="text-sm"
                />
              </section>
            </div>
          </div>

          <TabGroup manual className="border-t border-gray-500">
            <TabList className="flex flex-row justify-center items-center text-center gap-16">
              {tabs.map((item) => (
                <NavLink
                  end
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex flex-row justify-center items-center h-12 ${
                      isActive ?
                        "-mt-[1px] border-t dark:border-gray-200 dark:text-gray-200"
                      : "dark: text-gray-400 border-none"
                    }`
                  }
                >
                  <Tab className="flex flex-row justify-start items-center gap-1">
                    <item.Icon className="size-[0.9rem]" />
                    <span className="uppercase font-semibold text-sm">
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

          <div></div>
        </div>
      </div>
    </div>
  );
}
