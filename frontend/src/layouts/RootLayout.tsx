import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

const RootLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
