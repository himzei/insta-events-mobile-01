import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
