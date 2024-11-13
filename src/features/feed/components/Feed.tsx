import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import PostPreview from "../../posts/components/PostPreview";
import useFollowingPostsQuery from "../hooks/useFollowingPostsQuery";
import useForYouPostsQuery from "../hooks/useForYouPostsQuery";
import clsx from "clsx";
import FeedSidebar from "./FeedSidebar";

export default function Feed() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const pageVariant = new URLSearchParams(search).get("variant");
  const usePostsQuery =
    pageVariant === "following" ? useFollowingPostsQuery : useForYouPostsQuery;
  const { data: posts } = usePostsQuery();
  const postCount = posts?.length || 0;

  useEffect(() => {
    if (pageVariant !== "for-you" && pageVariant !== "following") {
      navigate("?variant=for-you", { replace: true });
    }
  }, [navigate, pageVariant]);

  return (
    <div className="flex flex-row justify-center pt-4 sm:mt-8">
      <div
        className="mx-0 w-full max-w-fit flex-grow overflow-auto sm:mx-4 md:mx-8 md:w-[32rem]
          lg:max-w-[46rem] xl:mx-16"
      >
        <div
          className="flex w-full max-w-2xl flex-row items-center justify-start gap-3 border-b
            border-slate-300 px-2 font-bold sm:px-0 dark:border-slate-600"
        >
          <NavLink to="?variant=for-you" end className="py-2">
            {({ isActive }) => (
              <span
                className={clsx(
                  isActive && pageVariant === "for-you" ?
                    ""
                  : "text-gray-400 dark:text-gray-700",
                )}
              >
                For you
              </span>
            )}
          </NavLink>
          <NavLink to="?variant=following" end className="py-2">
            {({ isActive }) => (
              <span
                className={clsx(
                  isActive && pageVariant === "following" ?
                    ""
                  : "text-gray-400 dark:text-gray-700",
                )}
              >
                Following
              </span>
            )}
          </NavLink>
        </div>

        <div className="mx-auto w-[28rem] max-w-full sm:w-[28rem]">
          <div className="w-full py-4">
            {postCount > 0 ?
              <div className="flex flex-col gap-4">
                {posts?.map((post, index) => (
                  <div key={post._id}>
                    <PostPreview post={post} />
                    {index < posts.length - 1 ?
                      <div className="mt-4 border-b border-slate-300 dark:border-slate-600" />
                    : null}
                  </div>
                ))}
              </div>
            : <div className="flex flex-col items-center justify-center py-12">
                <CheckCircleIcon className="size-28 stroke-[0.5]" />
                <span>{"No new posts"}</span>
              </div>
            }
          </div>

          <div className="mt-4 hidden flex-col border-t border-slate-300 dark:border-slate-600">
            <span className="text-lg">Suggested posts</span>
          </div>
        </div>
      </div>

      <FeedSidebar />
    </div>
  );
}
