import api from "./api";
import Follow from "../types/follow";
import ObjectId from "../types/objectId";
import Like from "../types/Like";
import Post from "../types/post";

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
  console.log("PSOT ", targetId);

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
};
