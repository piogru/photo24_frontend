import useFeedPostsQuery from "../hooks/useFeedPostsQuery";
import PostPreview from "../../posts/components/PostPreview";
import QueryError from "../../errors/components/QueryError";
import Spinner from "../../core/components/Spinner";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

type FeedPostListProps = {
  variant: string;
};

export default function FeedPostList({ variant }: FeedPostListProps) {
  const { data: posts, isPending, error } = useFeedPostsQuery(variant);

  if (isPending) {
    return (
      <div className="mx-auto mt-16 w-fit">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <QueryError error={error} />;
  }

  return (
    <>
      {posts.length ?
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <div key={post._id}>
              <PostPreview post={post} />
              <div className="mt-4 border-b border-slate-300 dark:border-slate-600" />
            </div>
          ))}
        </div>
      : <div className="flex flex-col items-center justify-center py-12">
          <CheckCircleIcon className="size-28 stroke-[0.5]" />
          <span>{"No new posts"}</span>
        </div>
      }
    </>
  );
}
