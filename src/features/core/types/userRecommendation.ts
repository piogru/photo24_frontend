import Follow from "./follow";
import User from "./user";

type UserRecommendation = User & {
  follow?: Follow;
};

export default UserRecommendation;
