import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../../App.tsx";
import { appLoader, exploreLoader } from "../api/loaders.ts";
import ErrorPage from "../components/ErrorPage.tsx";
import Profile from "../../profiles/components/Profile.tsx";
import NavbarWrapper from "../components/NavbarWrapper.tsx";
import LoginWrapper from "../../accounts/components/LoginWrapper.tsx";
import RegisterForm from "../../accounts/components/RegisterForm.tsx";
import LoginForm from "../../accounts/components/LoginForm.tsx";
import { isAuthenticated } from "../utils/auth.ts";
import Feed from "../../feed/components/Feed.tsx";
import Home from "../../landing/components/Home.tsx";
import { QueryClient } from "@tanstack/react-query";
import AuthenticatedRoute from "../components/AuthenticatedRoute.tsx";
import Explore from "../../explore/components/Explore.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader(queryClient),
    children: [
      {
        element: <AuthenticatedRoute Alternative={Home} />,
        children: [
          {
            element: <NavbarWrapper />,
            children: [
              {
                index: true,
                element: <Feed />,
              },
              {
                path: "explore",
                loader: exploreLoader(queryClient),
                element: <Explore />,
              },

              {
                path: ":accountName",
                loader: () => {
                  console.log("Profile, if user not found - redirect to 404");
                  return true;
                },
                element: <Profile />,
                children: [
                  {
                    element: <div>Posts</div>,
                  },
                  {
                    path: "saved",
                    element: <div>Saved</div>,
                  },
                ],
              },

              {
                path: "accounts/edit",
                element: <div>Accounts/edit</div>,
              },
            ],
          },
        ],
      },

      {
        path: "",
        element: <LoginWrapper />,
        loader: isAuthenticated(queryClient),
        children: [
          {
            path: "/accounts/login",
            element: <LoginForm />,
          },
          {
            path: "/accounts/signup",
            element: <RegisterForm />,
          },
        ],
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
