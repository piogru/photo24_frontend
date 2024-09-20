import ObjectId from "./objectId";
import User from "./user";

type Comment = {
  _id: ObjectId;
  author: User;
  content: string;
  likes: number;
};

export default Comment;
