import { UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid";
import Photo from "../types/photo";

type ProfilePicProps = {
  photo?: Photo;
};

export default function ProfilePic({ photo }: ProfilePicProps) {
  return (
    <>
      {photo ?
        <img
          src={photo.url}
          alt={photo.altText}
          className="size-full object-cover rounded-full"
        />
      : <UserCircleIconSolid
          className="size-full text-gray-700 dark:text-gray-200 rounded-full"
          viewBox="2 2 20 20"
        />
      }
    </>
  );
}
