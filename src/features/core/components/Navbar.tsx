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
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import useCurrentUserQuery from "../hooks/useCurrentUserQuery";

const navIconStyle =
  "size-7 text-gray-900 dark:text-gray-200 transition duration-75 group-active:scale-90 group-active:text-gray-700 dark:group-active:text-gray-400 group-hover:scale-105";
const menuIconStyle =
  "size-5 text-gray-900 dark:text-gray-200 group-active:text-gray-700 dark:group-active:text-gray-400";
const navButtonStyle =
  "w-full inline-flex items-center space-x-2 px-2 py-3 rounded-lg text-sm hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-gray-200 active:text-gray-700 dark:active:text-gray-400";

export default function Navbar() {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUserQuery();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: async () => {
      await queryClient.resetQueries({
        queryKey: ["auth"],
        exact: false,
      });
      await queryClient.setQueryData(["auth", "me"], null);

      navigate("/");
    },
  });
  const [theme, handleThemeChange] = useTheme();
  const links = [
    {
      route: "/",
      label: "Home",
      icon: <HomeIcon className={navIconStyle} />,
      iconActive: <HomeIconSolid className={navIconStyle} />,
    },
    {
      route: "/search",
      label: "Search",
      icon: <MagnifyingGlassIcon className={navIconStyle} />,
      iconActive: (
        <MagnifyingGlassIcon className={`${navIconStyle} stroke-2`} />
      ),
    },
    {
      route: "/explore",
      label: "Explore",
      icon: <ViewfinderCircleIcon className={navIconStyle} />,
      iconActive: <ViewfinderCircleIconSolid className={navIconStyle} />,
    },
    {
      route: "/create",
      label: "Create",
      icon: <PlusCircleIcon className={navIconStyle} />,
      iconActive: <PlusCircleIconSolid className={navIconStyle} />,
    },
    {
      route: `/${currentUser?.name}`,
      label: "Profile",
      icon: <UserIcon className={navIconStyle} />,
      iconActive: <UserIconSolid className={navIconStyle} />,
    },
  ];
  const menuItems = [
    {
      key: "settings",
      element: (
        <NavLink to="/accounts/edit" className={navButtonStyle}>
          <Cog6ToothIcon className={menuIconStyle} />
          <span>Settings</span>
        </NavLink>
      ),
    },
    {
      key: "saved",
      element: (
        <NavLink to={`/${currentUser?.name}/saved`} className={navButtonStyle}>
          <BookmarkIcon className={menuIconStyle} />
          <span>Saved</span>
        </NavLink>
      ),
    },
    {
      key: "appearance",
      element: () => {
        return (
          <button
            onClick={(event) => {
              event.preventDefault();
              handleThemeChange();
            }}
            className={navButtonStyle}
          >
            {theme === "dark" ?
              <MoonIcon className={menuIconStyle} />
            : <SunIcon className={menuIconStyle} />}
            <span>Dark mode</span>
            <div className="flex-grow" />
            <Switch
              enabled={theme === "dark"}
              onClick={() => {
                handleThemeChange();
              }}
            />
          </button>
        );
      },
    },
    {
      key: "divider-1",
      element: <div className="-mx-2 bg-gray-100 dark:bg-gray-700 h-1" />,
    },
    {
      key: "logout",
      element: (
        <button
          onClick={() => logoutMutation.mutate()}
          className={navButtonStyle}
        >
          <span>Log out</span>
        </button>
      ),
    },
  ];

  return (
    <nav className="h-screen w-64 px-4 pt-8 pb-5 flex flex-col space-y-6 border-r border-slate-300 dark:border-slate-600">
      <h1 className="text-4xl ml-2">Title</h1>
      <ul className="flex flex-col flex-grow space-y-3">
        {links.map((link) => {
          return (
            <li key={link.route}>
              <NavLink
                to={link.route}
                className="group w-full inline-flex items-center space-x-4 px-2 py-3 rounded-lg text-base hover:bg-black/5 dark:hover:bg-white/10 group:text-gray-700 dark:active:text-gray-400"
              >
                {({ isActive }) => {
                  return (
                    <>
                      {isActive ? link.iconActive : link.icon}
                      <div
                        className={`${isActive ? "font-semibold" : "font-normal"}`}
                      >
                        {link.label}
                      </div>
                    </>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <Dropdown
        buttonChildren={({ active }: { active: boolean }) => (
          <>
            <Bars3Icon
              className={`${navIconStyle} ${active ? "stroke-2" : null} transition duration-75 group-active:scale-90 group-hover:scale-105`}
            />
            <div
              className={`${active ? "font-semibold" : "font-normal"} group-active:text-gray-700 dark:group-active:text-gray-400`}
            >
              More
            </div>
          </>
        )}
        menuItemsProps={{ anchor: "bottom start" }}
        items={menuItems}
      />
    </nav>
  );
}
