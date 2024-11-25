type PostDTO = {
  files: File[];
  caption: string;
  hideLikes: boolean;
  commentsOff: boolean;
  fileInfo: { altText: string }[];
};

export default PostDTO;
