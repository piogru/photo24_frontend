import Follow from "../../core/types/follow";
import User from "../../core/types/user";

type UserRecommendation = User & {
  follow?: Follow;
};

export default UserRecommendation;
