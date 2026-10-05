import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Routers from "./routes/routes";
import Modal from "./components/Modal";

const App = () => {
  return (
    <>

      {/* router */}
      <RouterProvider router={Routers} />

      {/* toast */}
      <ToastContainer
        closeOnClick
        draggable
      />

      {/* global modal */}
      <Modal />

    </>
  );
};

export default App;