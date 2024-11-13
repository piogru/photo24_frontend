import { Button } from "@headlessui/react";
import useFollowButton from "../hooks/useFollowButton";
import ObjectId from "../../core/types/objectId";

type FollowButtonProps = {
  userId: ObjectId;
};

export default function FollowButton({ userId }: FollowButtonProps) {
  const { isFollowing, onFollow } = useFollowButton(userId);

  return (
    <Button
      onClick={() => onFollow()}
      className="rounded-lg bg-gray-300 px-4 py-1 font-semibold hover:bg-gray-400
        dark:bg-gray-700 dark:hover:bg-gray-800"
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
