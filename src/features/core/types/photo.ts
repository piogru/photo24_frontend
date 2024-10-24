import ObjectId from "./objectId";

type Photo = {
  _id: ObjectId;
  url: string;
  altText: string;
  width: number;
  height: number;
  hwRatio: string;
};

export default Photo;
