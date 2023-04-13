import React from "react";
import Login from "./Pages/login";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { UserProvider } from "./utilities/UserContext";
import Following from "./Pages/Following";
import Followers from "./Pages/Followers";
import Repositories from "./Pages/Repositories";

const App = () => {
  return (
    <UserProvider>
      <Outlet />
    </UserProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/follower",
        element: <Followers />,
      },
      {
        path: "/following",
        element: <Following />,
      },
      {
        path: "/repositories",
        element: <Repositories />,
      },
    ],
  },
]);

function Router() {
  return (
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  );
}

export default Router;
