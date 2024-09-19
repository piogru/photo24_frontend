import ObjectId from "./objectId";

type Photo = {
  _id: ObjectId;
  url: string;
  altText: string;
};

export default Photo;
