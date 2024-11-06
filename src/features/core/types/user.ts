import Photo from "./photo";

type User = {
  _id: string | number;
  name: string;
  description: string;
  profilePic?: Photo;
  posts: number;
  following: number;
  followers: number;
};

export default User;
