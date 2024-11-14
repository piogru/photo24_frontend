import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeedNavigation from "./FeedNavigation";
import FeedPostList from "./FeedPostList";
import FeedSidebar from "./FeedSidebar";
import WIP from "../../core/components/WIP";

export default function Feed() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const pageVariant = new URLSearchParams(search).get("variant") || "";

  useEffect(() => {
    if (!["for-you", "following"].includes(pageVariant)) {
      navigate("?variant=for-you", { replace: true });
    }
  }, [navigate, pageVariant]);

  return (
    <div className="flex flex-row justify-center pt-4 sm:mt-8">
      <div
        className="mx-0 w-full max-w-fit flex-grow overflow-auto sm:mx-4 md:mx-8 md:w-[32rem]
          lg:max-w-[46rem] xl:mx-16"
      >
        <FeedNavigation variant={pageVariant} />

        <div className="mx-auto w-[28rem] max-w-full sm:w-[28rem]">
          <div className="w-full py-4">
            <FeedPostList variant={pageVariant} />
          </div>

          <div className="mt-4 hidden flex-col border-t border-slate-300 dark:border-slate-600">
            <span className="text-lg">Suggested posts</span>
            <WIP />
          </div>
        </div>
      </div>

      <FeedSidebar />
    </div>
  );
}
