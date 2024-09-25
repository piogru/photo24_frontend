import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import PostPreview from "../../posts/components/PostPreview";
import RecommendedUsers from "./RecommendedUsers";
import ProfilePic from "../../core/components/ProfilePic";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import useFollowingPostsQuery from "../hooks/useFollowingPostsQuery";
import useForYouPostsQuery from "../hooks/useForYouPostsQuery";

export default function Feed() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const pageVariant = new URLSearchParams(search).get("variant");
  const usePostsQuery =
    pageVariant === "following" ? useFollowingPostsQuery : useForYouPostsQuery;
  const { data: posts } = usePostsQuery();
  const postCount = posts?.length || 0;
  const { data: currentUser } = useCurrentUserQuery();

  useEffect(() => {
    if (pageVariant !== "for-you" && pageVariant !== "following") {
      navigate("?variant=for-you", { replace: true });
    }
  }, [navigate, pageVariant]);

  return (
    <div className="mt-8 flex flex-row justify-center">
      <div className="w-full max-w-56 sm:max-w-[28rem] md:w-[32rem] lg:max-w-[42rem] xl:max-w-[56rem] mx-4 xl:mx-16 flex-grow">
        <div className="w-full flex flex-row justify-start items-center gap-3 font-bold border-b border-slate-300 dark:border-slate-600">
          <NavLink to="?variant=for-you" end className="py-2">
            {({ isActive }) => (
              <span
                className={`${isActive && pageVariant === "for-you" ? "" : "text-gray-400 dark:text-gray-700"}`}
              >
                For you
              </span>
            )}
          </NavLink>
          <NavLink to="?variant=following" end className="py-2">
            {({ isActive }) => (
              <span
                className={`${isActive && pageVariant === "following" ? "" : "text-gray-400 dark:text-gray-700"}`}
              >
                Following
              </span>
            )}
          </NavLink>
        </div>

        <div className="mx-auto max-w-full w-56 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[28rem]">
          <div className="w-full py-4">
            {postCount > 0 ?
              <div className="flex flex-col gap-4">
                {posts?.map((post) => (
                  <PostPreview key={post._id} post={post} />
                ))}
              </div>
            : <div className="flex flex-col justify-center items-center py-12">
                <CheckCircleIcon className="size-28 stroke-[0.5]" />
                <span>{"No new posts"}</span>
              </div>
            }
          </div>

          <div className="hidden flex-col mt-4 border-t border-slate-300 dark:border-slate-600">
            <span className="text-lg">Suggested posts</span>
          </div>
        </div>
      </div>

      <div className="w-64 mt-8 hidden xl:flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <NavLink to={`/${currentUser?.name}`} className="size-10">
            <ProfilePic photo={currentUser?.profilePic} />
          </NavLink>
          <NavLink to={`/${currentUser?.name}`}>
            <div>{currentUser?.name}</div>
          </NavLink>
        </div>

        <RecommendedUsers />
      </div>
    </div>
  );
}
