import { useState } from "react";
import useAllPostsQuery from "../hooks/useAllPostsQuery";
import PostSquare from "./PostSquare";
import PostModal from "../../core/components/PostModal";
import Post from "../../core/types/post";
import { NavLink } from "react-router-dom";
import Spinner from "../../core/components/Spinner";

export default function Explore() {
  const { data: allPosts } = useAllPostsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const pageLoading = useState(false);

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

      <div className="flex flex-col items-center pt-12 pb-4 mx-4">
        <div className="w-full flex flex-row justify-start items-center gap-3 font-bold">
          <NavLink to="" end className="py-2">
            {({ isActive }) => (
              <span
                className={`${isActive ? "" : "text-gray-400 dark:text-gray-700"}`}
              >
                Not personalized
              </span>
            )}
          </NavLink>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="max-w-4xl w-full grid grid-cols-3 gap-1">
            {allPosts?.map((post) => (
              <PostSquare
                key={post._id}
                onClick={() => openModal(post)}
                post={post}
              />
            ))}
          </div>
          {pageLoading ?
            <div>
              <Spinner />
            </div>
          : null}
        </div>
      </div>
    </>
  );
}
