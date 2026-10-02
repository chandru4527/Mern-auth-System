import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routers from "./routes/routes";

const App = () => {
  return (
    <>
      <RouterProvider router={Routers} />
      <ToastContainer />
    </>
  );
};

export default App;