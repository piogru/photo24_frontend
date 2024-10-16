import api from "./api";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";
import Like from "../types/like";
import Post from "../types/post";
import User from "../types/user";
import UserRecommendation from "../types/userRecommendation";

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

const getForYouPosts = async () => {
  return api.get<Post[]>(`/posts/for-you`).then((response) => {
    return response.data;
  });
};

const getFollowingPosts = async () => {
  return api.get<Post[]>(`/posts/following`).then((response) => {
    return response.data;
  });
};

const getUserPosts = async (userId: ObjectId) => {
  return api.get<Post[]>(`/posts?user=${userId}`).then((response) => {
    return response.data;
  });
};

const deletePost = async (postId: ObjectId) => {
  return api.delete(`posts/${postId}`).then((response) => {
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

const getReccomendedUsers = async () => {
  return api
    .get<UserRecommendation[]>("/users/recommended")
    .then((response) => {
      return response.data;
    });
};

const postQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId],
  queryFn: async () => getPost(postId),
});

const forYouPostsQuery = () => ({
  queryKey: ["posts", "forYou"],
  queryFn: async () => getForYouPosts(),
});

const followingPostsQuery = () => ({
  queryKey: ["posts", "following"],
  queryFn: async () => getFollowingPosts(),
});

const likeQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId, "like"],
  queryFn: async () => getLike(postId),
});

const followQuery = (targetId: ObjectId) => ({
  queryKey: ["follows", targetId],
  queryFn: async () => getFollow(targetId),
});

const usersByUsernameQuery = (username: string, partial: boolean = false) => ({
  queryKey: ["users", username, partial],
  queryFn: async () => getUsersByUsername(username, partial),
});

const userPostsQuery = (userId: ObjectId) => ({
  queryKey: ["users", userId, "posts"],
  queryFn: async () => getUserPosts(userId),
});

const recommendedUsersQuery = () => ({
  queryKey: ["users", "recommended"],
  queryFn: async () => getReccomendedUsers(),
  retryDelay: (attempt: number) => attempt * 1000,
  staleTime: 1000 * 60 * 5,
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
  forYouPostsQuery,
  followingPostsQuery,
  deletePost,
  likeQuery,
  followQuery,
  usersByUsernameQuery,
  userPostsQuery,
  recommendedUsersQuery,
};
