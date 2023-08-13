import DefaultLayout from "../layouts/Default.jsx";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound.jsx";

const routes = [
  {
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/",
        element: <Index />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
