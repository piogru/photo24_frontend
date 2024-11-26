import { useLoaderData } from "react-router-dom";
import ProfilePic from "../../core/components/ProfilePic";
import ShowMoreText from "../../core/components/ShowMoreText";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import useUsersByUsernameQuery from "../../core/hooks/useUsersByUsernameQuery";
import FollowButton from "../../follows/components/FollowButton";
import { profileLoader } from "../api/loaders";
import ProfilePicInput from "./ProfilePicInput";

type ProfileHeaderProps = {
  username: string;
};

export default function ProfileHeader({ username }: ProfileHeaderProps) {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof profileLoader>>
  >;
  const { data: currentUser } = useCurrentUserQuery();
  const { data: queriedUsers } = useUsersByUsernameQuery(username, false, [
    ...(initialData.user ? [initialData.user] : []),
  ]);
  const user = queriedUsers[0];

  return (
    <header
      className="mx-4 grid grid-cols-[76px_4fr] items-start justify-items-start gap-4
        sm:grid-cols-[120px_4fr] md:grid-cols-[1fr_2fr]"
    >
      <section className="row-start-1 mr-2 sm:row-end-4 md:row-end-5 md:mr-6 md:justify-self-center">
        <div className="relative size-16 sm:size-24 md:size-40">
          <ProfilePic photo={user?.profilePic} />
          {currentUser?._id === user._id ?
            <ProfilePicInput />
          : null}
        </div>
      </section>

      <section className="col-start-2 row-start-1">
        <div className="flex flex-row flex-wrap items-center justify-start gap-4 sm:justify-center">
          <h2 className="text-xl">{user.name}</h2>
          <div className="flex flex-row items-center gap-2">
            {currentUser?._id !== user._id ?
              <FollowButton userId={user._id} />
            : null}
          </div>
        </div>
      </section>

      <section className="col-start-1 row-start-2 sm:col-start-2">
        <div className="flex flex-row gap-4 md:gap-8">
          <div>
            <span className="font-semibold">{user.posts}</span>
            {" posts"}
          </div>
          <div>
            <span className="font-semibold">{user.followers}</span>
            {" followers"}
          </div>
          <div>
            <span className="font-semibold">{user.following}</span>
            {" following"}
          </div>
        </div>
      </section>

      <section
        className="col-start-1 col-end-3 row-start-3 row-end-4 whitespace-pre-line leading-none
          sm:row-start-4 md:col-start-2 md:col-end-2 md:row-start-3 md:row-end-3"
      >
        <div>
          <ShowMoreText
            text={user.description}
            overflowLength={250}
            textSize="text-sm"
          />
        </div>
      </section>
    </header>
  );
}
