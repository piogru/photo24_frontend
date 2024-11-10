import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import useAllPostsQuery from "../hooks/useAllPostsQuery";
import PostSquare from "../../core/components/PostSquare";
import PostModal from "../../posts/components/PostModal";
import Post from "../../core/types/post";
import Spinner from "../../core/components/Spinner";
import clsx from "clsx";

export default function Explore() {
  const { data: allPosts, isLoading: postsLoading } = useAllPostsQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { pathname, state } = useLocation();
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pathnameSplit = pathname.split("/");

    if (pathnameSplit.length >= 2 && pathnameSplit[1] === "p") {
      setModalOpen(true);
      setSelectedPost(allPosts?.find((post) => post._id === postId) || null);
    } else {
      setModalOpen(false);
      setSelectedPost(null);
    }
  }, [pathname, allPosts, postId]);

  const openModal = (post: Post) => {
    setModalOpen(true);
    setSelectedPost(post);
    navigate("/p/" + post._id, { state: { from: "explore" } });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
    state?.from === "explore" ? navigate(-1) : navigate("/explore");
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

      <div className="mx-0 flex flex-col items-center justify-center pb-4 pt-4 sm:mx-4 sm:pt-12">
        <div className="w-full max-w-4xl">
          <div className="mx-2 flex w-full flex-row items-center justify-start gap-3 font-bold sm:mx-0">
            <NavLink to="" end className="py-2">
              {({ isActive }) => (
                <span
                  className={clsx(
                    isActive ? "" : "text-gray-400 dark:text-gray-700",
                  )}
                >
                  Not personalized
                </span>
              )}
            </NavLink>
          </div>
          <div className="flex flex-col items-center gap-4">
            {postsLoading ?
              <Spinner />
            : <div className="grid w-full grid-cols-3 gap-0.5 sm:gap-1">
                {allPosts?.map((post) => (
                  <PostSquare
                    key={post._id}
                    onClick={() => openModal(post)}
                    post={post}
                  />
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
