import { NavLink } from "react-router-dom";
import User from "../../core/types/user";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import ProfilePic from "../../core/components/ProfilePic";
import FollowTextButton from "../../follows/components/FollowTextButton";

type UserBarProps = {
  user: User;
  followEnabled?: boolean;
};

export default function UserBar({ user, followEnabled = true }: UserBarProps) {
  const { data: currentUser } = useCurrentUserQuery();
  const isCurrentUser = currentUser?._id === user?._id;

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
                <FollowTextButton userId={user._id} />
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
