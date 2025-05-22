import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../components/dashboard/Sidebar"; // لو عندك سايدبار

function DashboardLayout() {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
