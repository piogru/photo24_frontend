import { Link, useLoaderData } from "react-router-dom";
import { profileLoader } from "../../core/api/loaders";
import Profile from "./Profile";

export default function ProfileWrapper() {
  const { user, follow } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof profileLoader>>
  >;

  return (
    <>
      {user ?
        <Profile user={user} follow={follow} />
      : <div className="flex flex-col justify-center items-center mt-12 gap-4">
          <div className="text-2xl">This page is not available.</div>
          <Link to="/" className="text-lg text-blue-500">
            Go back
          </Link>
        </div>
      }
    </>
  );
}
