import { ReactNode } from "react";
import useCurrentUserQuery from "../hooks/useCurrentUserQuery";
import UserRole from "../types/userRole";

type RoleGuardProps = {
  role: UserRole[];
  forbidden?: () => ReactNode;
  children: ReactNode;
};

export default function RoleGuard({
  role,
  forbidden,
  children,
}: RoleGuardProps) {
  const { data: currentUser } = useCurrentUserQuery();
  const isAuthorized = currentUser ? role.includes(currentUser?.role) : false;

  return <>{isAuthorized ? children : forbidden}</>;
}
