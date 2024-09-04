import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { currentUserQuery } from "../utils/auth";

type ProtectedRouteProps = {
  Alternative: FC;
};

export default function AuthenticatedRoute({
  Alternative,
}: ProtectedRouteProps) {
  const { data: user, isPending } = useQuery(currentUserQuery());

  if (isPending) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Alternative />;
}
