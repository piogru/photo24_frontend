import { NavLink } from "react-router-dom";
import User from "../types/user";

type UserBarProps = {
  user: User;
};

export default function UserBar({ user }: UserBarProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <NavLink to={`/${user?.name}`}>
        {user?.avatar.url ?
          <img src={user.avatar.url} className="size-8 rounded-full" />
        : <div className="size-8 rounded-full bg-gray-500" />}
      </NavLink>
      <NavLink to={`/${user?.name}`}>
        <div>Acc name</div>
      </NavLink>
    </div>
  );
}
