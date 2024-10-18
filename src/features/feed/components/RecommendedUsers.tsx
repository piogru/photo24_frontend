import { Button } from "@headlessui/react";
import ProfilePic from "../../core/components/ProfilePic";
import useRecommendedUsersQuery from "../../explore/hooks/useRecommendedUsersQuery";
import ObjectId from "../../core/types/objectId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFollow, postFollow } from "../../core/api/queries";
import UserRecommendation from "../../core/types/userRecommendation";
import { NavLink } from "react-router-dom";

export default function RecommendedUsers() {
  const queryClient = useQueryClient();
  const { data: recommendedUsers = [], isLoading } = useRecommendedUsersQuery();
  const followMutation = useMutation({
    mutationFn: postFollow,
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", variable],
        exact: false,
      });
      await queryClient.setQueryData(
        ["users", "recommended"],
        (oldData: UserRecommendation[]) => {
          const newData = [...oldData];
          const editedId = newData.findIndex((item) => item._id === variable);
          newData[editedId].follow = data;

          return newData;
        },
      );
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: async (data, variable) => {
      await queryClient.invalidateQueries({
        queryKey: ["follows", variable],
        exact: false,
      });
      await queryClient.setQueryData(
        ["users", "recommended"],
        (oldData: UserRecommendation[]) => {
          const newData = [...oldData];
          const editedId = newData.findIndex((item) => item._id === variable);
          delete newData[editedId].follow;

          return newData;
        },
      );
    },
  });

  const onFollowClick = (userId: ObjectId) => {
    const follow = recommendedUsers.find(
      (userRec) => userRec._id === userId,
    )?.follow;

    if (follow) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Suggested for you
      </span>
      {!isLoading ?
        <>
          {recommendedUsers.map((userRec) => (
            <div
              key={userRec._id}
              className="mx-2 flex flex-row items-center justify-between"
            >
              <div className="flex flex-row items-center gap-3">
                <NavLink to={`/${userRec.name}`}>
                  <div className="size-10">
                    <ProfilePic photo={userRec.profilePic} />
                  </div>
                </NavLink>
                <NavLink to={`/${userRec.name}`}>
                  <span>{userRec.name}</span>
                </NavLink>
              </div>

              <Button
                onClick={() => onFollowClick(userRec._id)}
                className="text-xs font-semibold text-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {userRec.follow ? "Following" : "Follow"}
              </Button>
            </div>
          ))}
        </>
      : null}
    </div>
  );
}
