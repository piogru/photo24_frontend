import api from "./api";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";
import User from "../types/user";

const getFollow = async (targetId: ObjectId) => {
  return api.get<Follow>(`/follows/${targetId}`).then((response) => {
    return response.data;
  });
};

const getUsersByUsername = async (username: string, partial: boolean) => {
  const queryString =
    partial ? `?name=${username}&partial=true` : `?name=${username}`;

  return api.get<User[]>(`/users${queryString}`).then((response) => {
    return response.data;
  });
};

const followQuery = (targetId: ObjectId) => ({
  queryKey: ["follows", targetId],
  queryFn: async () => getFollow(targetId),
});

const usersByUsernameQuery = (username: string, partial: boolean = false) => ({
  queryKey: ["users", username, partial],
  queryFn: async () => getUsersByUsername(username, partial),
  staleTime: 1 * 60 * 1000,
});

export { getFollow, followQuery, usersByUsernameQuery };
