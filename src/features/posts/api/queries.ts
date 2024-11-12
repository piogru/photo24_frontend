import api from "../../core/api/api";
import ObjectId from "../../core/types/objectId";
import Like from "../../core/types/like";
import Post from "../types/post";

const getAllPosts = async () => {
  return api.get<Post[]>("/posts").then((response) => {
    return response.data;
  });
};

const getPost = async (id: ObjectId) => {
  return api.get<Post>(`/posts/${id}`).then((response) => {
    return response.data;
  });
};

const deletePost = async (postId: ObjectId) => {
  return api.delete(`posts/${postId}`).then((response) => {
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

const allPostsQuery = () => ({
  queryKey: ["posts", "all"],
  retry: false,
  queryFn: async () => getAllPosts(),
});

const postQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId],
  queryFn: async () => getPost(postId),
});

const postLikeQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId, "like"],
  queryFn: async () => getLike(postId),
});

export {
  deletePost,
  postLike,
  deleteLike,
  allPostsQuery,
  postQuery,
  postLikeQuery,
};
