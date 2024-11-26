import useRecommendedUsersQuery from "../hooks/useRecommendedUsersQuery";
import UserRole from "../../core/types/userRole";
import RoleGuard from "../../core/components/RoleGuard";
import Spinner from "../../core/components/Spinner";
import RecommendedUser from "./RecommendedUser";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function RecommendedUsers() {
  const { data: recommendedUsers = [], isLoading } = useRecommendedUsersQuery();

  return (
    <aside className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
        Suggested for you
      </span>
      <RoleGuard role={[UserRole.User]}>
        {!isLoading ?
          <div className="flex flex-col gap-4">
            {recommendedUsers.map((userRec) => (
              <RecommendedUser key={userRec._id} userRecommendation={userRec} />
            ))}
          </div>
        : <div className="flex min-h-[264px] flex-col items-center justify-center gap-4">
            <Spinner />
          </div>
        }
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
