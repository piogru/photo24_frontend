import api from "../../core/api/api";
import User from "../../core/types/user";

const getCurrentUser = async () => {
  return api.get<User>("/auth/me").then((response) => {
    return response.data;
  });
};

const postSignup = async (userDTO: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post<User>("/auth/signup", userDTO).then((response) => {
    return response.data;
  });
};

const postLogin = async (userLoginDTO: {
  userId: string;
  password: string;
}) => {
  return api.post<User>("/auth/login", userLoginDTO).then((response) => {
    return response.data;
  });
};

const postLoginGuest = async () => {
  return api.post<User>("/auth/guest").then((response) => {
    return response.data;
  });
};

const postLogout = async () => {
  return api.post("/auth/logout").then((response) => {
    return response.data;
  });
};

export { getCurrentUser, postSignup, postLogin, postLoginGuest, postLogout };
