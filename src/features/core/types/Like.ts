import ObjectId from "./objectId";

type Like = {
  _id: ObjectId;
  user: string | number;
  target: string | number;
  targetModel: "Post" | "Comment";
};

export default Like;
