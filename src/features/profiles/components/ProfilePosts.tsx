import { useLoaderData } from "react-router-dom";
import Spinner from "../../core/components/Spinner";
import useUserPosts from "../../core/hooks/useUserPosts";
import PostSquare from "../../core/components/PostSquare";
import { profilePostsLoader } from "../../core/api/loaders";
import { CameraIcon } from "@heroicons/react/24/outline";
import PostModal from "../../posts/components/PostModal";
import Post from "../../core/types/post";
import { useState } from "react";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";

export default function ProfilePosts() {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof profilePostsLoader>>
  >;
  const { data: currentUser } = useCurrentUserQuery();
  const { data: posts, isLoading: postsLoading } = useUserPosts(
    initialData.user ? initialData.user._id : "",
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setModalOpen(true);
    setSelectedPost(post);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <>
      {selectedPost ?
        <PostModal
          post={selectedPost}
          isOpen={modalOpen}
          onClose={closeModal}
        />
      : null}

      <div className="flex flex-col items-center justify-center gap-4">
        {posts && posts?.length > 0 ?
          <>
            {postsLoading ?
              <Spinner />
            : <div className="grid w-full grid-cols-3 gap-1">
                {posts?.map((post) => (
                  <PostSquare
                    key={post._id}
                    onClick={() => openModal(post)}
                    post={post}
                  />
                ))}
              </div>
            }
          </>
        : <div className="flex h-80 flex-col items-center justify-center gap-2 text-center">
            <CameraIcon className="size-16 rounded-full border border-gray-900 stroke-1 p-2 dark:border-gray-200" />
            {currentUser?._id === initialData.user?._id ?
              <div>
                <div className="text-2xl font-bold">Share photos</div>
                <span>Your shared photos will appear here.</span>
              </div>
            : <span className="text-lg">
                This user has not shared any photos.
              </span>
            }
          </div>
        }
      </div>
    </>
  );
}
