import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App, { testLoader } from "../../../App.tsx";
import ErrorPage from "../components/ErrorPage.tsx";
import Profile from "../../profiles/components/Profile.tsx";
import NavbarWrapper from "../components/NavbarWrapper.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: testLoader,
    children: [
      {
        path: "",
        element: <NavbarWrapper />,
        children: [
          {
            path: ":accountName",
            element: <Profile />,
            children: [
              {
                path: "",
                element: <div>Posts</div>,
              },
              {
                path: "saved",
                element: <div>Saved</div>,
              },
            ],
          },
          {
            path: "explore",
            element: <div>Explore</div>,
          },
        ],
      },

      {
        path: "/accounts/login",
        element: <div>Login</div>,
      },
      {
        path: "/accounts/signup",
        element: <div>Signup</div>,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
