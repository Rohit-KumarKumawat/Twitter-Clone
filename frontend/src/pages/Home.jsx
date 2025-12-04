import React from "react";
import LeftSidebar from "./LeftSidebar";
import CenterFeed from "./CenterFeed";
import RightPanel from "./RightPanel";
import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-black text-white h-screen w-full overflow-hidden">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-[275px] hidden lg:block fixed h-full border-r border-gray-800 overflow-y-auto">
          <LeftSidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
