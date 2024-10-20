import { ComponentType, Fragment, useEffect, useState } from "react";
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
  "group xl:w-full block xl:inline-flex xl:items-center xl:gap-4 p-2 rounded-none sm:rounded-lg text-base hover:bg-black/5 dark:hover:bg-white/10 group:text-gray-700 dark:active:text-gray-400";
const menuButtonStyle =
  "group w-full inline-flex items-center gap-2 p-2 rounded-none sm:rounded-lg text-sm hover:bg-black/5 dark:hover:bg-white/10 text-gray-900 dark:text-gray-200 active:text-gray-700 dark:active:text-gray-400";
const menuIconStyle =
  "size-5 text-gray-900 dark:text-gray-200 group-active:text-gray-700 dark:group-active:text-gray-400";

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
        position="left-[76px]"
      >
        <SearchUsers />
      </Drawer>

      <nav
        className={`z-10 shrink-0 sm:h-screen ${searchDrawerOpen ? "mr-44 w-fit" : "w-full sm:w-fit xl:w-64"} fixed bottom-0 overflow-y-auto border-r-0 border-t border-slate-300 bg-white sm:static sm:border-r sm:border-t-0 dark:border-slate-600 dark:bg-gray-900`}
      >
        <div className="flex h-fit flex-row justify-evenly gap-0 sm:min-h-screen sm:flex-col sm:justify-normal sm:gap-6 sm:px-3 sm:pt-8 sm:pb-5">
          <NavLink
            to="/"
            className="hidden h-fit w-fit sm:flex sm:flex-row sm:items-start sm:justify-start xl:h-16"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} ml-2`}
                >
                  <SiteLogo />
                </div>
                <div
                  className={`group ${searchDrawerOpen ? "block" : "block xl:hidden"} group:text-gray-700 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 dark:active:text-gray-400`}
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
                            className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} ${isActive ? "font-semibold" : "font-normal"}`}
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
              </Fragment>
            );
          })}
          <div className="hidden grow sm:block" />
          <Dropdown
            buttonChildren={({ active }: { active: boolean }) => (
              <div className="inline-flex w-full items-center gap-4 rounded-none p-2 hover:bg-black/5 sm:rounded dark:hover:bg-white/10">
                <Bars3Icon
                  className={`size-8 text-gray-900 transition duration-75 group-hover:scale-105 group-active:scale-90 group-active:text-gray-700 dark:text-gray-200 dark:group-active:text-gray-400 ${active ? "stroke-2" : null} `}
                />
                <div
                  className={`${searchDrawerOpen ? "hidden" : "hidden xl:block"} ${active ? "font-semibold" : "font-normal"} group-active:text-gray-700 dark:group-active:text-gray-400`}
                >
                  More
                </div>
              </div>
            )}
            menuItemsProps={{ anchor: "bottom start" }}
            items={menuItems}
          />
        </div>
      </nav>
    </>
  );
}
