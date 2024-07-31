import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { DefaultLayout } from "../layouts/default-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
