import Photo from "./photo";
import User from "./user";

type Post = {
  _id: string | number;
  user: User;
  photos: Photo[];
  caption: string;
  hideLikes: boolean;
  commentsOff: boolean;
  createdAt: string;
  updatedAt: string;
};

export default Post;
