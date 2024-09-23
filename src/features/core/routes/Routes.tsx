import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../../App.tsx";
import { QueryClient } from "@tanstack/react-query";
import {
  appLoader,
  exploreLoader,
  postDetailsLoader,
  profileLoader,
} from "../api/loaders.ts";
import { isAuthenticated } from "../utils/auth.ts";
import ErrorPage from "../components/ErrorPage.tsx";
import NavbarWrapper from "../components/NavbarWrapper.tsx";
import LoginWrapper from "../../accounts/components/LoginWrapper.tsx";
import RegisterForm from "../../accounts/components/RegisterForm.tsx";
import LoginForm from "../../accounts/components/LoginForm.tsx";
import Feed from "../../feed/components/Feed.tsx";
import Home from "../../landing/components/Home.tsx";
import AuthenticatedRoute from "../components/AuthenticatedRoute.tsx";
import Explore from "../../explore/components/Explore.tsx";
import ProfileWrapper from "../../profiles/components/ProfileWrapper.tsx";
import ProfilePosts from "../../profiles/components/ProfilePosts.tsx";
import ProfileSaved from "../../profiles/components/ProfileSaved.tsx";

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
                path: "explore/",
                loader: exploreLoader(queryClient),
                element: <Explore />,
              },
              {
                path: "p/:postId",
                loader: postDetailsLoader(queryClient),
                element: <Explore />,
              },

              {
                path: ":username",
                loader: profileLoader(queryClient),
                element: <ProfileWrapper />,
                children: [
                  {
                    index: true,
                    element: <ProfilePosts />,
                  },
                  {
                    path: "saved",
                    element: <ProfileSaved />,
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
