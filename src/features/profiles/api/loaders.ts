import { QueryClient } from "@tanstack/react-query";
import { ActionFunctionArgs, ParamParseKey, Params } from "react-router-dom";
import { followQuery, usersByUsernameQuery } from "../../core/api/queries";
import { userPostsQuery } from "./queries";

const Paths = {
  profileDetail: "/:username",
  profilePostsDetail: ":username",
  profileSavedDetail: "/:username/saved",
} as const;

interface ProfileLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.profileDetail>>;
}

interface ProfilePostsLoaderArgs extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.profilePostsDetail>>;
}

export const profileLoader =
  (queryClient: QueryClient) =>
  async ({ params }: ProfileLoaderArgs) => {
    if (!params.username) {
      return { user: null, follow: null };
    }

    const user = await queryClient
      .ensureQueryData(usersByUsernameQuery(params.username))
      .then((data) => {
        return data[0];
      })
      .catch(() => {
        return null;
      });
    const follow =
      user ?
        await queryClient
          .ensureQueryData(followQuery(user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          })
      : null;

    return { user, follow };
  };

export const profilePostsLoader =
  (queryClient: QueryClient) =>
  async ({ params }: ProfilePostsLoaderArgs) => {
    if (!params.username) {
      return { user: null, posts: [] };
    }

    const user = await queryClient
      .ensureQueryData(usersByUsernameQuery(params.username))
      .then((data) => {
        return data[0];
      })
      .catch(() => {
        return null;
      });
    const posts =
      user ?
        await queryClient
          .ensureQueryData(userPostsQuery(user._id))
          .then((data) => {
            return data;
          })
          .catch(() => {
            return null;
          })
      : null;

    return { user, posts };
  };
