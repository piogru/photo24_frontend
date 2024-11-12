import api from "../../core/api/api";
import ObjectId from "../../core/types/objectId";
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

const postQuery = (postId: ObjectId) => ({
  queryKey: ["posts", postId],
  queryFn: async () => getPost(postId),
});

export { getAllPosts, deletePost, postQuery };
