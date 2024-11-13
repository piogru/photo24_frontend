import { useMutation, useQueryClient } from "@tanstack/react-query";
import ObjectId from "../../core/types/objectId";
import UserRecommendation from "../../feed/types/userRecommendation";
import useFollowQuery from "../../core/hooks/useFollowQuery";
import { deleteFollow, postFollow } from "../api/queries";
import Follow from "../../core/types/follow";

export default function useFollowButton(userId: ObjectId) {
  const queryClient = useQueryClient();
  const { data: follow } = useFollowQuery(userId);
  const isFollowing = !!follow;

  const onSuccess = async (data: Follow, variable: ObjectId) => {
    await queryClient.invalidateQueries({
      queryKey: ["follows", variable],
      exact: false,
    });
    await queryClient.setQueryData(
      ["users", "recommended"],
      (oldData: UserRecommendation[]) => {
        const newData = [...oldData];
        const editedId = newData.findIndex((item) => item._id === variable);
        if (editedId) {
          newData[editedId].follow = data;
        }

        return newData;
      },
    );
  };

  const followMutation = useMutation({
    mutationFn: postFollow,
    onSuccess: onSuccess,
  });

  const unfollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: onSuccess,
  });

  const onFollow = () => {
    if (follow) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  return { isFollowing, onFollow };
}
