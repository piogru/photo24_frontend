import User from "./user";

type Comment = {
  _id: number | string;
  author: User;
  content: string;
  likes: number;
};

export default Comment;
