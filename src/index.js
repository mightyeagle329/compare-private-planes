import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleAircraftDetails from "./views/SingleAircraftDetails";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/singleAircraft/:id", element: <SingleAircraftDetails /> },
]);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
