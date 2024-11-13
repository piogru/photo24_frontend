import ProfilePic from "../../core/components/ProfilePic";
import useRecommendedUsersQuery from "../hooks/useRecommendedUsersQuery";
import { NavLink } from "react-router-dom";
import RoleGuard from "../../core/components/RoleGuard";
import UserRole from "../../core/types/userRole";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import FollowTextButton from "../../follows/components/FollowTextButton";

export default function RecommendedUsers() {
  const { data: recommendedUsers = [], isLoading } = useRecommendedUsersQuery();

  return (
    <aside className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Suggested for you
      </span>
      <RoleGuard role={[UserRole.User]}>
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

                <FollowTextButton userId={userRec._id} />
              </div>
            ))}
          </>
        : null}
      </RoleGuard>
      <RoleGuard role={[UserRole.Guest]}>
        <div className="flex flex-row items-center gap-2 text-gray-500 dark:text-gray-400">
          <InformationCircleIcon className="size-6 shrink-0" />
          <span className="text-sm">
            Recommendations are only available to logged in users
          </span>
        </div>
      </RoleGuard>
    </aside>
  );
}
