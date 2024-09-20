type User = {
  _id: string | number;
  name: string;
  email: string;
  profilePic: {
    url: string;
    altText: string;
  };
};

export default User;
