import { redirect } from "react-router-dom";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  console.log("isAuthenticated - token: ", token);
  if (token) throw redirect("/");
  return null;
};

export const isAuth = () => {
  // return true;
  return false;
};
