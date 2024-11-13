import { Button } from "@headlessui/react";
import useFollowButton from "../hooks/useFollowButton";
import ObjectId from "../../core/types/objectId";

type FollowTextButtonProps = {
  userId: ObjectId;
};

export default function FollowTextButton({ userId }: FollowTextButtonProps) {
  const { isFollowing, onFollow } = useFollowButton(userId);

  return (
    <Button
      onClick={() => onFollow()}
      className="text-xs font-semibold text-blue-500 hover:text-gray-700 dark:hover:text-gray-200"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
