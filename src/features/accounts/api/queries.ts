import api from "../../core/api/api";

type User = {
  id: string;
  name: string;
  email: string;
};

const postSignup = async (userDTO: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post<User>("/auth/signup", userDTO).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};

const postLogin = async (userLoginDTO: {
  userId: string;
  password: string;
}) => {
  return api.post<User>("/auth/login", userLoginDTO).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};

export { postSignup, postLogin };
