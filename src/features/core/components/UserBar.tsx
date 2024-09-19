import { NavLink } from "react-router-dom";
import User from "../types/user";

type UserBarProps = {
  user: User;
};

export default function UserBar({ user }: UserBarProps) {
  const profilePic = user?.profilePic;

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
      <NavLink to={`/${user?.name}`}>
        <div className="font-semibold">{user ? user.name : "Unknown user"}</div>
      </NavLink>
    </div>
  );
}
