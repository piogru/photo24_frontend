import api from "../../core/api/api";
import Post from "../../posts/types/post";
import UserRecommendation from "../types/userRecommendation";

const getReccomendedUsers = async () => {
  return api
    .get<UserRecommendation[]>("/users/recommended")
    .then((response) => {
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

const recommendedUsersQuery = () => ({
  queryKey: ["users", "recommended"],
  queryFn: async () => getReccomendedUsers(),
  retryDelay: (attempt: number) => attempt * 1000,
  staleTime: 5 * 60 * 1000,
});

const forYouPostsQuery = () => ({
  queryKey: ["posts", "forYou"],
  queryFn: async () => getForYouPosts(),
});

const followingPostsQuery = () => ({
  queryKey: ["posts", "following"],
  queryFn: async () => getFollowingPosts(),
});

const feedPostsQuery = (variant: string) => ({
  queryKey: ["posts", "feed", variant],
  queryFn: () => {
    switch (variant) {
      case "for-you":
        return getForYouPosts();
      case "following":
        return getFollowingPosts();
      default:
        return getForYouPosts();
    }
  },
  staleTime: 30 * 1000,
});

export {
  recommendedUsersQuery,
  forYouPostsQuery,
  followingPostsQuery,
  feedPostsQuery,
};
