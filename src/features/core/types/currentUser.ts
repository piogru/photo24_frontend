import Photo from "./photo";
import UserRole from "./userRole";

type CurrentUser = {
  _id: string | number;
  name: string;
  profilePic?: Photo;
  role: UserRole;
};

export default CurrentUser;
