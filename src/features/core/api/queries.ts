import api from "./api";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";
import Like from "../types/like";
import Post from "../types/post";
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

const getLike = async (targetId: ObjectId) => {
  return api.get<Like>(`/posts/${targetId}/like`).then((response) => {
    return response.data;
  });
};

const postLike = async (targetId: ObjectId) => {
  return api.post<Like>(`/posts/${targetId}/like`).then((response) => {
    return response.data;
  });
};

const deleteLike = async (targetId: ObjectId) => {
  return api.delete(`/posts/${targetId}/like`).then((response) => {
    return response.data;
  });
};

const getPost = async (id: ObjectId) => {
  return api.get<Post>(`/posts/${id}`).then((response) => {
    return response.data;
  });
};

const getUserPosts = async (userId: ObjectId) => {
  return api.get<Post[]>(`/posts?user=${userId}`).then((response) => {
    return response.data;
  });
};

const getUserByUsername = async (username: string) => {
  return api.get<User[]>(`/users?name=${username}`).then((response) => {
    const user = response.data.length >= 1 ? response.data[0] : null;
    return user;
  });
};

const postQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId],
  queryFn: async () => getPost(postId),
});

const likeQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId, "like"],
  queryFn: async () => getLike(postId),
});

const followQuery = (targetId: ObjectId) => ({
  queryKey: ["follows", targetId],
  queryFn: async () => getFollow(targetId),
});

const userQuery = (username: string) => ({
  queryKey: ["users", username],
  queryFn: async () => getUserByUsername(username),
});

const userPostsQuery = (userId: ObjectId) => ({
  queryKey: ["users", userId, "posts"],
  queryFn: async () => getUserPosts(userId),
});

export {
  getFollow,
  getFollowers,
  getFollowing,
  postFollow,
  deleteFollow,
  getLike,
  postLike,
  deleteLike,
  postQuery,
  likeQuery,
  followQuery,
  userQuery,
  userPostsQuery,
};
