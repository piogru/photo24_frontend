type User = {
  id: string;
  name: string;
  email: string;
  avatar: {
    url: string;
    altText: string;
  };
};

export default User;
