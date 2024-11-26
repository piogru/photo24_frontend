import { Link, useLoaderData } from "react-router-dom";
import { profileLoader } from "../api/loaders";
import Profile from "./Profile";

export default function ProfileWrapper() {
  const { user } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof profileLoader>>
  >;

  return (
    <>
      {user ?
        <Profile />
      : <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <div className="text-2xl">This page is not available.</div>
          <Link to="/" className="text-lg text-blue-500">
            Go back
          </Link>
        </div>
      }
    </>
  );
}
