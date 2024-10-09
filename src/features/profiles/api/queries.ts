import api from "../../core/api/api";

type profilePicDTO = {
  profilePic: File;
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

export { patchProfilePic, deleteProfilePic };
