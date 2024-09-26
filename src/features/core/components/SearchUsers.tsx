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
        <div
          className="
          relative w-full group flex flex-row items-center border rounded-md
        border-gray-300 dark:border-gray-600 has-[:focus]:border-gray-600 has-[:focus]:dark:border-gray-500
        "
        >
          <Input
            id={"search"}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="peer pl-10 focus:pl-2.5 pr-2.5 py-2 mr-6 w-full bg-inherit text-sm text-inherit text-ellipsis ring-0 ring-inset
            focus:outline-none focus:ring-0 text-gray-800 dark:text-gray-400 focus:text-gray-900 focus:dark:text-gray-200"
            placeholder="Search"
          />
          <label htmlFor={"search"} className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon className="absolute start-2 size-6 block peer-focus:hidden text-gray-400 " />
          <Button
            onClick={clearInput}
            className="absolute end-0 p-2 block peer-placeholder-shown:hidden peer-placeholder-shown:peer-focus:hidden peer-focus:block"
          >
            <XCircleIcon className="size-5 focus:text-gray-900 focus:dark:text-gray-200" />
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        {!isFetching ?
          <>
            {users?.map((user) => (
              <NavLink
                key={user._id}
                to={`/${user.name}`}
                className="w-full flex flex-row px-4 sm:px-6 py-2 items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800"
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
