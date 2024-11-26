import api from "../../core/api/api";
import CurrentUser from "../../core/types/currentUser";

const getCurrentUser = async () => {
  return api.get<CurrentUser>("/auth/me").then((response) => {
    return response.data;
  });
};

const postSignup = async (userDTO: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post<CurrentUser>("/auth/signup", userDTO).then((response) => {
    return response.data;
  });
};

const postLogin = async (userLoginDTO: {
  userId: string;
  password: string;
}) => {
  return api.post<CurrentUser>("/auth/login", userLoginDTO).then((response) => {
    return response.data;
  });
};

const postLoginGuest = async () => {
  return api.post<CurrentUser>("/auth/guest").then((response) => {
    return response.data;
  });
};

const postLogout = async () => {
  return api.post("/auth/logout").then((response) => {
    return response.data;
  });
};

const currentUserQuery = () => ({
  queryKey: ["auth", "me"],
  retry: false,
  queryFn: async () => getCurrentUser(),
  staleTime: 3 * 60 * 1000,
});

export {
  getCurrentUser,
  postSignup,
  postLogin,
  postLoginGuest,
  postLogout,
  currentUserQuery,
};
