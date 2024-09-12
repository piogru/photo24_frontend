import api from "../../core/api/api";

const postPost = async (post: {
  files: File[];
  caption: string;
  hideLikes: boolean;
  commentsOff: boolean;
  fileInfo: { altText: string }[];
}) => {
  return api.post("/post/", post).then((response) => {
    return response.data;
  });
};

export { postPost };
