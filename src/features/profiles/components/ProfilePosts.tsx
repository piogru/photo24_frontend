import { useLoaderData } from "react-router-dom";
import Spinner from "../../core/components/Spinner";
import useUserPosts from "../../core/hooks/useUserPosts";
import PostSquare from "../../explore/components/PostSquare";
import { profilePostsLoader } from "../../core/api/loaders";
import { CameraIcon } from "@heroicons/react/24/outline";
import PostModal from "../../core/components/PostModal";
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

      <div className="flex flex-col justify-center items-center gap-4">
        {posts && posts?.length > 0 ?
          <>
            {postsLoading ?
              <Spinner />
            : <div className="w-full grid grid-cols-3 gap-1">
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
        : <div className="h-80 flex flex-col items-center justify-center gap-2">
            <CameraIcon className="size-16 stroke-1 rounded-full border-2 p-2" />
            {currentUser?._id === initialData.user?._id ?
              <div>
                <span className="text-2xl font-bold">Share photos</span>
                <span>Your shared photos will appear here.</span>
              </div>
            : <span className="text-lg">This user has not shared any photos.</span>}
          </div>
        }
      </div>
    </>
  );
}
