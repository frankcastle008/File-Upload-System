import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/upload/:id",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);

export default router;
