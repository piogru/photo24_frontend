import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow, postFollow } from "../../core/api/queries";
import User from "../../core/types/user";
import { Button } from "@headlessui/react";
import useFollowQuery from "../../core/hooks/useFollowQuery";
import ProfilePic from "../../core/components/ProfilePic";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";

type UserBarProps = {
  user: User;
  followEnabled?: boolean;
};

export default function UserBar({ user, followEnabled = true }: UserBarProps) {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUserQuery();
  const isCurrentUser = currentUser?._id === user?._id;
  const { data: follow } = useFollowQuery(user?._id);
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

  return (
    <div className="flex flex-row items-center gap-3">
      {user ?
        <>
          <NavLink to={`/${user?.name}`}>
            <div className="size-8">
              <ProfilePic photo={user?.profilePic} />
            </div>
          </NavLink>
          <div className="flex flex-row items-center gap-2">
            <NavLink to={`/${user?.name}`}>
              <div className="font-semibold">
                {user ? user.name : "Unknown user"}
              </div>
            </NavLink>
            {followEnabled && !isCurrentUser ?
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
        </>
      : <>
          <div className="size-8">
            <ProfilePic />
          </div>
          <div className="font-semibold">{"Unknown user"}</div>
        </>
      }
    </div>
  );
}
