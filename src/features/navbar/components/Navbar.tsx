import { ComponentType, Fragment, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "../../accounts/api/queries";
import useTheme from "../../core/hooks/useTheme";
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
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Dropdown from "../../core/components/Dropdown";
import Switch from "../../core/components/Switch";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import PhotoUpload from "../../photo/components/PhotoUpload";
import NavIcon from "./NavIcon";
import MagnifyingGlassIconSolid from "../../core/components/MagnifyingGlassIconSolid";
import SiteLogo from "../../core/components/SiteLogo";
import { Button } from "@headlessui/react";
import SearchUsers from "../../users/components/SearchUsers";
import Drawer from "../../core/components/Drawer";
import clsx from "clsx";

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

const navButtonStyle = `group block rounded-none p-2 text-base sm:rounded-lg xl:inline-flex xl:w-full
  xl:items-center xl:gap-4 group:text-gray-700 hover:bg-black/5 dark:hover:bg-white/10
  dark:active:text-gray-400`;
const menuButtonStyle = `group inline-flex w-full items-center gap-2 rounded-none p-2 text-sm
  sm:rounded-lg text-gray-900 hover:bg-black/5 active:text-gray-700 dark:text-gray-200
  dark:hover:bg-white/10 dark:active:text-gray-400`;
const menuIconStyle = `size-5 text-gray-900 group-active:text-gray-700 dark:text-gray-200
  dark:group-active:text-gray-400`;

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
      key: "about",
      element: (
        <NavLink to="/about" className={`${menuButtonStyle} block sm:hidden`}>
          <InformationCircleIcon className={menuIconStyle} />
          <span>About</span>
        </NavLink>
      ),
    },
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
          <Button
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
          </Button>
        );
      },
    },
    {
      key: "divider-1",
      element: <div className="-mx-2 h-1 bg-gray-100 dark:bg-gray-700" />,
    },
    {
      key: "logout",
      element: (
        <Button
          onClick={() => logoutMutation.mutate()}
          className={menuButtonStyle}
        >
          <span>Log out</span>
        </Button>
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
        position="left-0 sm:left-[76px]"
      >
        <SearchUsers />
      </Drawer>

      <header
        className={clsx(
          `fixed bottom-0 z-10 h-12 w-full shrink-0 overflow-y-auto border-r-0 border-t
          border-slate-300 bg-white sm:static sm:h-screen sm:w-fit sm:border-r
          sm:border-t-0 dark:border-slate-600 dark:bg-gray-900`,
          searchDrawerOpen ? "mr-0 sm:mr-[11.4rem]" : "xl:w-64",
        )}
      >
        <nav
          className="flex h-fit flex-row justify-evenly gap-0 sm:min-h-screen sm:flex-col
            sm:justify-normal sm:gap-6 sm:px-3 sm:pb-5 sm:pt-8"
        >
          <NavLink
            to="/"
            className="hidden h-fit w-fit sm:flex sm:flex-row sm:items-start sm:justify-start xl:h-16"
          >
            {({ isActive }) => (
              <>
                <div
                  className={clsx(
                    "ml-2",
                    searchDrawerOpen ? "hidden" : "hidden xl:block",
                  )}
                >
                  <SiteLogo />
                </div>
                <div
                  className={clsx(
                    `group:text-gray-700 group rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10
                    dark:active:text-gray-400`,
                    searchDrawerOpen ? "block" : "block xl:hidden",
                  )}
                >
                  <h1>
                    <NavIcon
                      isActive={isActive}
                      Icon={CameraIcon}
                      ActiveIcon={CameraIcon}
                      title={import.meta.env.VITE_APP_TITLE}
                    />
                  </h1>
                </div>
              </>
            )}
          </NavLink>
          {links.map((item) => {
            return (
              <Fragment key={item.key}>
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
                            className={clsx(
                              isActive ? "font-semibold" : "font-normal",
                              searchDrawerOpen ? "hidden" : "hidden xl:block",
                            )}
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
                      className={clsx(
                        "font-normal",
                        searchDrawerOpen ? "hidden" : "hidden xl:block",
                      )}
                    >
                      {item.label}
                    </div>
                  </Button>
                }
              </Fragment>
            );
          })}
          <div className="hidden grow sm:block" />
          <Dropdown
            buttonChildren={({ active }: { active: boolean }) => (
              <div
                className="inline-flex w-full items-center gap-4 rounded-none p-2 hover:bg-black/5
                  sm:rounded dark:hover:bg-white/10"
              >
                <Bars3Icon
                  className={clsx(
                    `size-8 text-gray-900 transition duration-75 group-hover:scale-105
                    group-active:scale-90 group-active:text-gray-700 dark:text-gray-200
                    dark:group-active:text-gray-400`,
                    active && "stroke-2",
                  )}
                />
                <div
                  className={clsx(
                    "group-active:text-gray-700 dark:group-active:text-gray-400",
                    searchDrawerOpen ? "hidden" : "hidden xl:block",
                    active ? "font-semibold" : "font-normal",
                  )}
                >
                  More
                </div>
              </div>
            )}
            menuItemsProps={{ anchor: "bottom start" }}
            items={menuItems}
          />
        </nav>
      </header>
    </>
  );
}
