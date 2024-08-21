import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import deferRoleChecking from "./deferRoleChecking.js";
import GoogleOAuth from "./GoogleOAuth.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: deferRoleChecking,
  },
  {
    path: "/login/google/auth",
    element: <GoogleOAuth />,
  },
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
]);
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1046716752032-28rvh1r1374cvfk00uomnm1f2km1anag.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
