import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SingleAircraftDetails from "./views/SingleAircraft/SingleAircraftDetails";
import CompareAircrafts from "./views/compareAircrafts/CompareAircrafts";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/aircrafts/:aircraft_name", element: <SingleAircraftDetails /> },
  { path: "/compare/", element: <CompareAircrafts /> },
]);
root.render(<RouterProvider router={router} />);  
