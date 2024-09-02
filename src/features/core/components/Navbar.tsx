import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  ViewfinderCircleIcon as ViewfinderCircleIconSolid,
  UserIcon as UserIconSolid,
  Bars3Icon as Bars3IconSolid,
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
  TagIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogout } from "../../accounts/api/queries";

const iconStyle = "size-6 text-gray-400";
const links = [
  {
    route: "/",
    label: "Home",
    icon: <HomeIcon className={iconStyle} />,
  },
  {
    route: "/search",
    label: "Search",
    icon: <MagnifyingGlassIcon className={iconStyle} />,
  },
  {
    route: "/explore",
    label: "Explore",
    icon: <ViewfinderCircleIcon className={iconStyle} />,
  },
  {
    route: "/create",
    label: "Create",
    icon: <PlusCircleIcon className={iconStyle} />,
  },
  {
    route: "/profile",
    label: "Profile",
    icon: <UserIcon className={iconStyle} />,
  },
  {
    route: "/accounts/login",
    label: "Login",
    icon: <UserIcon className={iconStyle} />,
  },
  {
    route: "/accounts/signup",
    label: "Sign up",
    icon: <UserIcon className={iconStyle} />,
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
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

  return (
    <nav className="h-screen w-60 p-6 flex flex-col gap-4 border-r-2 border-slate-600">
      <h1 className="text-4xl">Title</h1>
      <ul className="flex flex-col flex-grow space-y-2">
        {links.map((link) => {
          return (
            <li key={link.route} className="py-2">
              <Link to={link.route} className="flex space-x-4">
                <div>{link.icon}</div>
                <div>{link.label}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="">
        <button className="flex flex-row space-x-4">
          <Bars3Icon className={iconStyle} />
          <div>More</div>
        </button>
        <button
          onClick={() => mutation.mutate()}
          className="flex flex-row space-x-4"
        >
          <div>Log out</div>
        </button>
      </div>
    </nav>
  );
}
