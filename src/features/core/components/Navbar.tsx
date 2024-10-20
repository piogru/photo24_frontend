import { ComponentType, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
  CameraIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import Switch from "./Switch";
import useCurrentUserQuery from "../hooks/useCurrentUserQuery";
import PhotoUpload from "../../photo/components/PhotoUpload";
import NavIcon from "./NavIcon";
import MagnifyingGlassIconSolid from "./MagnifyingGlassIconSolid";
import SiteLogo from "./SiteLogo";
import { Button } from "@headlessui/react";
import SearchUsers from "./SearchUsers";
import Drawer from "./Drawer";

type NavbarElement = {
  key: string;
  label: string;
  icon: ComponentType<{
    className?: string;
  }>;
  iconActive: ComponentType<{
    className?: string;
  }>;
};
type NavbarLink = NavbarElement & {
  route: string;
};
type NavbarButton = NavbarElement & {
  onClick: () => void;
};
type NavbarItem = NavbarLink | NavbarButton;

const navButtonStyle =
  "group w-full inline-flex items-center space-x-4 px-2 py-2 xl:py-3 rounded-lg text-base hover:bg-black/5 dark:hover:bg-white/10 group:text-gray-700 dark:active:text-gray-400";
const menuIconStyle =
  "size-5 text-gray-900 dark:text-gray-200 group-active:text-gray-700 dark:group-active:text-gray-400";
const menuButtonStyle =
  "group w-full inline-flex items-center space-x-2 px-2 py-3 rounded-lg text-sm hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-gray-200 active:text-gray-700 dark:active:text-gray-400";

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

      navigate("/");
    },
  });
  const [theme, handleThemeChange] = useTheme();
  const [photoUploadOpen, setPhotoUploadOpen] = useState(false);
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const links: NavbarItem[] = [
    {
      key: "home",
      route: "/",
      label: "Home",
      icon: HomeIcon,
      iconActive: HomeIconSolid,
    },
    {
      key: "search",
      label: "Search",
      onClick: () => {
        setSearchDrawerOpen(!searchDrawerOpen);
      },
      icon: MagnifyingGlassIcon,
      iconActive: MagnifyingGlassIconSolid,
    },
    {
      key: "explore",
      route: "/explore",
      label: "Explore",
      icon: ViewfinderCircleIcon,
      iconActive: ViewfinderCircleIconSolid,
    },
    {
      key: "create",
      label: "Create",
      onClick: () => {
        setPhotoUploadOpen(true);
      },
      icon: PlusCircleIcon,
      iconActive: PlusCircleIconSolid,
    },
    {
      key: "profile",
      route: `/${currentUser?.name}`,
      label: "Profile",
      icon: UserIcon,
      iconActive: UserIconSolid,
    },
  ];
  const menuItems = [
    {
      key: "settings",
      element: (
        <NavLink to="/accounts/edit" className={menuButtonStyle}>
          <Cog6ToothIcon className={menuIconStyle} />
          <span>Settings</span>
        </NavLink>
      ),
    },
    {
      key: "saved",
      element: (
        <NavLink to={`/${currentUser?.name}/saved`} className={menuButtonStyle}>
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
            className={menuButtonStyle}
          >
            {theme === "dark" ?
              <MoonIcon className={menuIconStyle} />
            : <SunIcon className={menuIconStyle} />}
            <span>Dark mode</span>
            <div className="flex-grow" />
            <Switch
              checked={theme === "dark"}
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
          className={menuButtonStyle}
        >
          <span>Log out</span>
        </button>
      ),
    },
  ];
  const { pathname } = useLocation();

  useEffect(() => {
    setSearchDrawerOpen(false);
  }, [pathname]);

  const onSearchClose = () => {
    setSearchDrawerOpen(() => false);
  };

  return (
    <>
      <PhotoUpload isOpen={photoUploadOpen} setIsOpen={setPhotoUploadOpen} />
      <Drawer
        isOpen={searchDrawerOpen}
        title="Search"
        onClose={onSearchClose}
        position="left-[76px]"
      >
        <SearchUsers />
      </Drawer>

      <nav
        className={`z-10 h-screen ${searchDrawerOpen ? "w-fit mr-44" : "w-fit xl:w-64"} px-4 pt-8 pb-5 flex flex-col space-y-6 border-r border-slate-300 dark:border-slate-600 bg-white dark:bg-gray-900`}
      >
        <NavLink
          to="/"
          className="h-16 flex flex-row justify-start items-start"
        >
          {({ isActive }) => (
            <>
              <div
                className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} ml-2`}
              >
                <SiteLogo />
              </div>
              <div
                className={`group ${searchDrawerOpen ? "block" : "block xl:hidden"} p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 group:text-gray-700 dark:active:text-gray-400`}
              >
                <NavIcon
                  isActive={isActive}
                  Icon={CameraIcon}
                  ActiveIcon={CameraIcon}
                />
              </div>
            </>
          )}
        </NavLink>
        <ul className="flex flex-col flex-grow space-y-3">
          {links.map((item) => {
            return (
              <li key={item.key}>
                {"route" in item ?
                  <NavLink to={item.route} className={navButtonStyle}>
                    {({ isActive }) => {
                      return (
                        <>
                          <NavIcon
                            isActive={isActive}
                            title={item.label}
                            Icon={item.icon}
                            ActiveIcon={item.iconActive}
                          />
                          <div
                            className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"}  ${isActive ? "font-semibold" : "font-normal"}`}
                          >
                            {item.label}
                          </div>
                        </>
                      );
                    }}
                  </NavLink>
                : <Button onClick={item.onClick} className={navButtonStyle}>
                    <NavIcon
                      isActive={false}
                      title={item.label}
                      Icon={item.icon}
                      ActiveIcon={item.iconActive}
                    />
                    <div
                      className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} font-normal`}
                    >
                      {item.label}
                    </div>
                  </Button>
                }
              </li>
            );
          })}
        </ul>

        <Dropdown
          buttonChildren={({ active }: { active: boolean }) => (
            <>
              <Bars3Icon
                className={`
                   size-7 text-gray-900 dark:text-gray-200 transition duration-75 group-active:scale-90 group-active:text-gray-700 dark:group-active:text-gray-400 group-hover:scale-105
                   ${active ? "stroke-2" : null}
                 `}
              />
              <div
                className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} ${active ? "font-semibold" : "font-normal"} group-active:text-gray-700 dark:group-active:text-gray-400`}
              >
                More
              </div>
            </>
          )}
          menuItemsProps={{ anchor: "bottom start" }}
          items={menuItems}
        />
      </nav>
    </>
  );
}
