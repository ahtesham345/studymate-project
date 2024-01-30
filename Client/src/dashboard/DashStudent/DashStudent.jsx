import React from "react";
import { useState } from "react";
import "../../App.css";
import Header from "../../dashboard/Header";
import Sidebar from "../../dashboard/Sidebar";
export default function DashboardComp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <h1 className="w-full h-screen text-3xl font-extrabold text-white mx-auto ">
        Student DashBoard
      </h1>
    </div>
  );
}
