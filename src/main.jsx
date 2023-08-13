import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import defaultRoutes from "./routes/default";
import { AuthContextProvider } from "./store/auth-context";
import "./index.css";

const router = createBrowserRouter([...defaultRoutes]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
