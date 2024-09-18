import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAllPostsQuery from "../hooks/useAllPostsQuery";
import PostSquare from "./PostSquare";
import PostModal from "../../core/components/PostModal";
import Post from "../../core/types/post";
import Spinner from "../../core/components/Spinner";

export default function Explore() {
  const { data: allPosts } = useAllPostsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathnameSplit = location.pathname.split("/");
    if (pathnameSplit.length >= 1 && pathnameSplit[1] !== "p") {
      setModalOpen(false);
      setSelectedPost(null);
    }
  }, [location]);

  const openModal = (post: Post) => {
    setModalOpen(true);
    setSelectedPost(post);
    navigate("/p/" + post._id);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
    navigate(-1);
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

      <div className="flex flex-col justify-center items-center pt-12 pb-4 mx-4">
        <div className="max-w-4xl">
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
            <div className="w-full grid grid-cols-3 gap-1">
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
      </div>
    </>
  );
}
