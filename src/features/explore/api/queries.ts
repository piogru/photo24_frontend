import api from "../../core/api/api";
import Post from "../../core/types/post";

const allPostsQuery = () => ({
  queryKey: ["posts", "all"],
  retry: false,
  queryFn: async () => getAllPosts(),
});

const getAllPosts = async () => {
  return api.get<Post[]>("/posts/").then((response) => {
    return response.data;
  });
};

export { allPostsQuery, getAllPosts };
