import api from "../../core/api/api";
import Post from "../../core/types/post";
import UserRecommendation from "../types/userRecommendation";

const getReccomendedUsers = async () => {
  return api
    .get<UserRecommendation[]>("/users/recommended")
    .then((response) => {
      return response.data;
    });
};

const recommendedUsersQuery = () => ({
  queryKey: ["users", "recommended"],
  queryFn: async () => getReccomendedUsers(),
  retryDelay: (attempt: number) => attempt * 1000,
  staleTime: 1000 * 60 * 5,
});

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

const forYouPostsQuery = () => ({
  queryKey: ["posts", "forYou"],
  queryFn: async () => getForYouPosts(),
});

const followingPostsQuery = () => ({
  queryKey: ["posts", "following"],
  queryFn: async () => getFollowingPosts(),
});

export { recommendedUsersQuery, forYouPostsQuery, followingPostsQuery };
