import { Input } from "@headlessui/react";
import ProfilePic from "./ProfilePic";
import User from "../types/user";

export default function SearchUsers() {
  const users: User[] = [];

  return (
    <div>
      <Input />

      <div>
        {users.map((user) => (
          <ProfilePic key={user._id} photo={user.profilePic} />
        ))}
      </div>
    </div>
  );
}
