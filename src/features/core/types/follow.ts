import ObjectId from "./objectId";

type Follow = {
  _id: ObjectId;
  follower: string | number;
  target: string | number;
};

export default Follow;
