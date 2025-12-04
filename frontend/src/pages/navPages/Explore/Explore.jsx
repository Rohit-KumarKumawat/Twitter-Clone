// src/pages/Home.jsx
import React from "react";
import CenterFeed from "./CenterFeed";
import RightPanel from "./RightPanel";

const Home = () => {
  return (
    <div className="flex-1 ml-[275px] flex">
      <div className="flex-1 max-w-2xl border-x border-gray-800 overflow-y-auto">
        <CenterFeed />
      </div>
      <div className="hidden xl:block w-[350px] border-l border-gray-800 overflow-y-auto">
        <RightPanel />
      </div>
    </div>
  );
};

export default Home;
