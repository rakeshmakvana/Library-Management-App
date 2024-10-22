import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";

const RouterComp = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className="bg-richBlue-100 flex flex-row h-screen">
      {isLoggedIn && <NavBar />} 
      <div className="flex-1 px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RouterComp;
