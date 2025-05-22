import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();
  const hideNavbarPages = ["/login", "/register"];

  return (
    <>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}
      <Outlet />
      {!hideNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
}

export default MainLayout;
