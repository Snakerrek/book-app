import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";

const PageLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default PageLayout;
