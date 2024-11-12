import api from "./api";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";
import User from "../types/user";

const getFollow = async (targetId: ObjectId) => {
  return api.get<Follow>(`/follows/${targetId}`).then((response) => {
    return response.data;
  });
};

const getFollowing = async (followerId: ObjectId) => {
  return api
    .get<Follow[]>(`/follows/${followerId}/following`)
    .then((response) => {
      return response.data;
    });
};

const getFollowers = async (targetId: ObjectId) => {
  return api
    .get<Follow[]>(`/follows/${targetId}/followers`)
    .then((response) => {
      return response.data;
    });
};

const postFollow = async (targetId: ObjectId) => {
  return api.post<Follow>(`/follows/${targetId}`).then((response) => {
    return response.data;
  });
};

const deleteFollow = async (targetId: ObjectId) => {
  return api.delete(`/follows/${targetId}`).then((response) => {
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
});

export {
  getFollow,
  getFollowers,
  getFollowing,
  postFollow,
  deleteFollow,
  followQuery,
  usersByUsernameQuery,
};
