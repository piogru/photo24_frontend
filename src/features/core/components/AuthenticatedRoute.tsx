import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../accounts/api/queries";

type ProtectedRouteProps = {
  Alternative: FC;
};

export default function AuthenticatedRoute({
  Alternative,
}: ProtectedRouteProps) {
  const currentUserQuery = () => ({
    queryKey: ["auth", "me"],
    retry: false,
    queryFn: async () => getCurrentUser(),
  });
  const { data: user, isPending } = useQuery(currentUserQuery());

  if (isPending) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Alternative />;
}
