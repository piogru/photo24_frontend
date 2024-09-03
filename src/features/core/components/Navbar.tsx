import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "../../accounts/api/queries";
import useTheme from "../hooks/useTheme";
import {
  HomeIcon as HomeIconSolid,
  ViewfinderCircleIcon as ViewfinderCircleIconSolid,
  UserIcon as UserIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ViewfinderCircleIcon,
  UserIcon,
  Bars3Icon,
  PlusCircleIcon,
  SunIcon,
  MoonIcon,
  BookmarkIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const iconStyle = "size-6 text-gray-400";
const links = [
  {
    route: "/",
    label: "Home",
    icon: <HomeIcon className={iconStyle} />,
    iconActive: <HomeIconSolid className={iconStyle} />,
  },
  {
    route: "/search",
    label: "Search",
    icon: <MagnifyingGlassIcon className={iconStyle} />,
    iconActive: <MagnifyingGlassIcon className={`${iconStyle} stroke-2`} />,
  },
  {
    route: "/explore",
    label: "Explore",
    icon: <ViewfinderCircleIcon className={iconStyle} />,
    iconActive: <ViewfinderCircleIconSolid className={iconStyle} />,
  },
  {
    route: "/create",
    label: "Create",
    icon: <PlusCircleIcon className={iconStyle} />,
    iconActive: <PlusCircleIconSolid className={iconStyle} />,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: <UserIcon className={iconStyle} />,
    iconActive: <UserIconSolid className={iconStyle} />,
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await queryClient.resetQueries({
        queryKey: ["auth"],
        exact: false,
      });
      await queryClient.setQueryData(["auth", "me"], null);

      console.log("REMOVE");
      navigate("/");
    },
  });
  const [theme, handleThemeChange] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="h-screen w-60 p-6 flex flex-col gap-4 border-r-2 border-slate-600">
      <h1 className="text-4xl">Title</h1>
      <ul className="flex flex-col flex-grow space-y-2">
        {links.map((link) => {
          return (
            <li key={link.route} className="py-2">
              <NavLink to={link.route} className="flex space-x-4">
                {({ isActive }) => {
                  return (
                    <>
                      {isActive ? link.iconActive : link.icon}
                      <div>{link.label}</div>
                    </>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col space-y-2">
        <button
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="inline-flex flex-row space-x-4"
        >
          <Bars3Icon
            className={`${iconStyle} ${menuOpen ? "stroke-2" : null}`}
          />
          <div>More</div>
        </button>

        <button className="inline-flex space-x-2">
          <Cog6ToothIcon className={iconStyle} />
          <div>Settings</div>
        </button>
        <button className="inline-flex space-x-2">
          <BookmarkIcon className={iconStyle} />
          <div>Saved</div>
        </button>
        <button
          onClick={() => {
            handleThemeChange();
          }}
          className="inline-flex space-x-2"
        >
          {theme === "dark" ?
            <MoonIcon className={iconStyle} />
          : <SunIcon className={iconStyle} />}
          <div>Switch appearance</div>
        </button>
        <button
          onClick={() => logoutMutation.mutate()}
          className="inline-flex flex-row space-x-4"
        >
          <div>Log out</div>
        </button>
      </div>
    </nav>
  );
}
