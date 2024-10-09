import Comment from "./comment";
import ObjectId from "./objectId";
import Photo from "./photo";
import User from "./user";

type Post = {
  _id: ObjectId;
  user: User;
  photos: Photo[];
  caption: string;
  likes: number;
  comments: Comment[];
  hideLikes: boolean;
  commentsOff: boolean;
  createdAt: string;
  updatedAt: string;
};

export default Post;
