import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NowPlaying from "./pages/nowPlaying.jsx";
import TopRated from "./pages/topRated.jsx";
import UpComing from "./pages/upComing.jsx";
import HomePage from "./pages/homePage.jsx";
import DetailPage from "./pages/detailPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignupPage from "./pages/signUpPage.jsx";
import NotFound from "./pages/404NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/now-playing",
    element: <NowPlaying />,
  },
  {
    path: "/top-rated",
    element: <TopRated />,
  },
  {
    path: "/upcoming",
    element: <UpComing />,
  },
  {
    path: "/detail/:id",
    element: <DetailPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <SignupPage />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
