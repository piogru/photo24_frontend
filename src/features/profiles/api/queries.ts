import api from "../../core/api/api";
import ObjectId from "../../core/types/objectId";
import Post from "../../posts/types/post";

type profilePicDTO = {
  profilePic: File;
};

const getUserPosts = async (userId: ObjectId) => {
  return api.get<Post[]>(`/posts?user=${userId}`).then((response) => {
    return response.data;
  });
};

const patchProfilePic = async ({ profilePic }: profilePicDTO) => {
  const formData = new FormData();

  formData.append("photo", profilePic);

  return api.patch("/users/self", formData).then((response) => {
    return response.data;
  });
};

const deleteProfilePic = async () => {
  return api.delete("/users/self/profilePic").then((response) => {
    return response.data;
  });
};

const userPostsQuery = (userId: ObjectId) => ({
  queryKey: ["users", userId, "posts"],
  queryFn: async () => getUserPosts(userId),
  staleTime: 1 * 60 * 1000,
});

export { userPostsQuery, patchProfilePic, deleteProfilePic };
