import { useState } from "react";
import useUsersByUsernameQuery from "../hooks/useUsersByUsernameQuery";
import { Button, Input } from "@headlessui/react";
import ProfilePic from "./ProfilePic";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Spinner from "./Spinner";
import { NavLink } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function SearchUsers() {
  const [inputValue, setInputValue] = useState("");
  const [value] = useDebounce(inputValue, 500);
  const { data: users, isFetching } = useUsersByUsernameQuery(value, true);

  const clearInput = () => {
    setInputValue("");
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="px-4 sm:px-6">
        <div className="group relative flex w-full flex-row items-center rounded-md border border-gray-300 has-[:focus]:border-gray-600 dark:border-gray-600 has-[:focus]:dark:border-gray-500">
          <Input
            id={"search"}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="peer mr-6 w-full text-ellipsis bg-inherit py-2 pl-10 pr-2.5 text-sm text-gray-800 text-inherit ring-0 ring-inset focus:pl-2.5 focus:text-gray-900 focus:outline-none focus:ring-0 dark:text-gray-400 focus:dark:text-gray-200"
            placeholder="Search"
          />
          <label htmlFor={"search"} className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon className="absolute start-2 block size-6 text-gray-400 peer-focus:hidden" />
          <Button
            onClick={clearInput}
            className="absolute end-0 block p-2 peer-placeholder-shown:hidden peer-focus:block peer-placeholder-shown:peer-focus:hidden"
          >
            <XCircleIcon className="size-5 focus:text-gray-900 focus:dark:text-gray-200" />
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col items-center">
        {!isFetching ?
          <>
            {users?.map((user) => (
              <NavLink
                key={user._id}
                to={`/${user.name}`}
                className="flex w-full flex-row items-center gap-2 px-4 py-2 hover:bg-gray-200 sm:px-6 dark:hover:bg-gray-800"
              >
                <div className="size-10">
                  <ProfilePic photo={user.profilePic} />
                </div>
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-xs font-normal text-gray-800 dark:text-gray-400">
                    {user.followers} followers
                  </span>
                </div>
              </NavLink>
            ))}
          </>
        : <Spinner />}
      </div>
    </section>
  );
}
