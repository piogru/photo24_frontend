import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App, { testLoader } from "../../../App.tsx";
import App from "../../../App.tsx";
import ErrorPage from "../components/ErrorPage.tsx";
import Profile from "../../profiles/components/Profile.tsx";
import NavbarWrapper from "../components/NavbarWrapper.tsx";
import LoginWrapper from "../../accounts/components/LoginWrapper.tsx";
import RegisterForm from "../../accounts/components/RegisterForm.tsx";
import LoginForm from "../../accounts/components/LoginForm.tsx";
import { isAuth, isAuthenticated } from "../utils/auth.ts";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import Feed from "../../feed/components/Feed.tsx";
import Home from "../../landing/components/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: testLoader,
    children: [
      {
        element: <ProtectedRoute conditionHook={isAuth} Alternative={Home} />,
        children: [
          {
            // path: "",
            element: <NavbarWrapper />,
            children: [
              {
                // path: "",
                index: true,
                element: <Feed />,
              },
              {
                loader: () => {
                  console.log("Redirect if not logged in");
                  return true;
                },
                children: [
                  {
                    path: ":accountName",
                    element: <Profile />,
                    children: [
                      {
                        // path: "",
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
            ],
          },
          //   ],
          // },
        ],
      },

      {
        path: "",
        element: <LoginWrapper />,
        loader: async () => await isAuthenticated(),
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
