import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow, postFollow } from "../api/queries";
import User from "../types/user";
import { Button } from "@headlessui/react";
import useFollowQuery from "../hooks/useFollowQuery";

type UserBarProps = {
  user: User;
  followEnabled?: boolean;
};

export default function UserBar({ user, followEnabled = true }: UserBarProps) {
  const queryClient = useQueryClient();
  const profilePic = user?.profilePic;
  const { data: follow } = useFollowQuery(user._id);
  const followMutation = useMutation({
    mutationFn: postFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", user?._id],
        exact: false,
      });
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", user?._id],
        exact: false,
      });
    },
  });

  const onFollowClick = () => {
    if (follow) {
      unfollowMutation.mutate(user._id);
    } else {
      followMutation.mutate(user._id);
    }
  };

  console.log(follow)

  return (
    <div className="flex flex-row items-center gap-3">
      <NavLink to={`/${user?.name}`}>
        {profilePic ?
          <img
            src={profilePic.url}
            alt={profilePic.altText}
            className="size-8 rounded-full"
          />
        : <div className="size-8 rounded-full bg-gray-500" />}
      </NavLink>
      <div className="flex flex-row items-center gap-2">
        <NavLink to={`/${user?.name}`}>
          <div className="font-semibold">
            {user ? user.name : "Unknown user"}
          </div>
        </NavLink>
        {followEnabled ?
          <>
            <span>{"•"}</span>
            <Button
              onClick={onFollowClick}
              className="text-sm text-blue-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              {follow ? "Following" : "Follow"}
            </Button>
          </>
        : null}
      </div>
    </div>
  );
}
