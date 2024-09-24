type User = {
  _id: string | number;
  name: string;
  email: string;
  description: string;
  profilePic: {
    url: string;
    altText: string;
  };
  posts: number;
  following: number;
  followers: number;
};

export default User;
