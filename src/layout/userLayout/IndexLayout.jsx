import React from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";

const IndexLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <ScrollToTop />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default IndexLayout;