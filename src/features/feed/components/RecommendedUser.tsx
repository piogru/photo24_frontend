import { NavLink } from "react-router-dom";
import UserRecommendation from "../types/userRecommendation";
import ProfilePic from "../../core/components/ProfilePic";
import FollowTextButton from "../../follows/components/FollowTextButton";

type UserRecommendationProps = {
  userRecommendation: UserRecommendation;
};

export default function RecommendedUser({
  userRecommendation,
}: UserRecommendationProps) {
  return (
    <div className="flex grow flex-row items-center justify-between px-2">
      <div className="flex flex-row items-center gap-3">
        <NavLink to={`/${userRecommendation.name}`}>
          <div className="size-10">
            <ProfilePic photo={userRecommendation.profilePic} />
          </div>
        </NavLink>
        <NavLink to={`/${userRecommendation.name}`}>
          <span>{userRecommendation.name}</span>
        </NavLink>
      </div>

      <FollowTextButton userId={userRecommendation._id} />
    </div>
  );
}
