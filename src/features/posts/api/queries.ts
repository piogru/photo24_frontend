import api from "../../core/api/api";
import Post from "../../core/types/post";

const getAllPosts = async () => {
  return api.get<Post[]>("/posts").then((response) => {
    return response.data;
  });
};

export { getAllPosts };
