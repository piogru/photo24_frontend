import api from "../../core/api/api";
import PostDTO from "../types/postDTO";

const postPost = async ({
  files,
  caption,
  hideLikes,
  commentsOff,
  fileInfo,
}: PostDTO) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("photos[]", file);
  });
  formData.append("caption", caption);
  formData.append("hideLikes", JSON.stringify(hideLikes));
  formData.append("commentsOff", JSON.stringify(commentsOff));
  fileInfo.forEach((obj) => {
    formData.append("fileInfo[]", JSON.stringify(obj));
  });

  return api.post("/posts/", formData).then((response) => {
    return response.data;
  });
};

export { postPost };
