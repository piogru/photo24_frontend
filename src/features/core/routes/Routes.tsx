import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App, { testLoader } from "../../../App.tsx";
import App from "../../../App.tsx";
import ErrorPage from "../components/ErrorPage.tsx";
import Profile from "../../profiles/components/Profile.tsx";
import NavbarWrapper from "../components/NavbarWrapper.tsx";
import LoginWrapper from "../../accounts/components/LoginWrapper.tsx";
import RegisterForm from "../../accounts/components/RegisterForm.tsx";
import LoginForm from "../../accounts/components/LoginForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: testLoader,
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
        path: "",
        element: <LoginWrapper />,
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
