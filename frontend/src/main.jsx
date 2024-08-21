import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <h1>HSBC Hackathon on 21/08/2024</h1>,
  },
  {
    path: "/check",
    element: <h1>Check Complete</h1>,
  },
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
