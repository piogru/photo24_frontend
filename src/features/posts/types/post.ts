import Comment from "../../core/types/comment";
import ObjectId from "../../core/types/objectId";
import Photo from "../../core/types/photo";
import User from "../../core/types/user";

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
