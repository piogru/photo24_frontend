import { FC } from "react";
import { Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  conditionHook: () => boolean;
  Alternative: FC;
};

export default function ProtectedRoute({
  conditionHook,
  Alternative,
}: ProtectedRouteProps) {
  // const token = localStorage.getItem("token");
  // console.log(
  //   `Protected route [token: ${token}], redirect [${token ? "no" : "yes"}]`,
  // );
  // return token ? <Outlet /> : <Navigate to="/accounts/login" />;

  const condition = conditionHook();
  console.log(condition);

  return condition ? <Outlet /> : <Alternative />;
}
