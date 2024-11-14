import { NavLink } from "react-router-dom";
import ProfilePic from "../../core/components/ProfilePic";
import RecommendedUsers from "./RecommendedUsers";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";

export default function FeedSidebar() {
  const { data: currentUser } = useCurrentUserQuery();

  return (
    <div className="mt-8 hidden w-80 flex-col gap-4 px-4 xl:flex">
      <div className="flex flex-row items-center gap-3">
        <NavLink to={`/${currentUser?.name}`} className="size-10">
          <ProfilePic photo={currentUser?.profilePic} />
        </NavLink>
        <NavLink to={`/${currentUser?.name}`}>
          <div>{currentUser?.name}</div>
        </NavLink>
      </div>

      <RecommendedUsers />
    </div>
  );
}
