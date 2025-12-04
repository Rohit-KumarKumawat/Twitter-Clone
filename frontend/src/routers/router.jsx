// src/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login";
import { createBrowserRouter } from "react-router-dom";
import Register from "../Components/Register";
import Home from "../pages/Home";
import Start from "./../Components/Start";
import Communities from "../pages/navPages/Communities";
import Explore from "../pages/navPages/Explore/Explore";
import Grok from "../pages/navPages/Grok/Grok";
import Messages from "../pages/navPages/Messages";
import Notifications from "../pages/navPages/Notifications/Notifications";
import Premium from "../pages/navPages/Premium";
import Profile from "../pages/navPages/Profile";
import Verifiedorgs from "../pages/navPages/Verifiedorgs";
import Hero from "../pages/Hero";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            path: "/home/hero",
            element: <Hero />,
          },
          {
            path: "/home/communities",
            element: <Communities />,
          },
          {
            path: "/home/explore",
            element: <Explore />,
          },
          {
            path: "/home/grok",
            element: <Grok />,
          },
          {
            path: "/home/messages",
            element: <Messages />,
          },
          {
            path: "/home/notifications",
            element: <Notifications />,
          },
          {
            path: "/home/premium",
            element: <Premium />,
          },
          {
            path: "/home/profile",
            element: <Profile />,
          },
          {
            path: "/home/verifiedorgs",
            element: <Verifiedorgs />,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
