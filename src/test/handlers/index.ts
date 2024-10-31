import { handlers as authHandlers } from "./auth";
import { handlers as followsHandlers } from "./follows";
import { handlers as postsHandlers } from "./posts";
import { handlers as usersHandlers } from "./users";

export default [
  ...authHandlers,
  ...followsHandlers,
  ...postsHandlers,
  ...usersHandlers,
];
