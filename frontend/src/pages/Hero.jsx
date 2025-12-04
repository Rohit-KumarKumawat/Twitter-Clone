import React from "react";
import CenterFeed from "./CenterFeed";
import RightPanel from "./RightPanel";

const Hero = () => {
  return (
    <div className="bg-black text-white h-screen w-full flex overflow-hidden">
      {/* Center Feed */}
      <div className="flex-1 lg:ml-[275px] max-w-2xl border-x border-gray-800 overflow-y-auto h-full">
        <CenterFeed />
      </div>

      {/* Right Panel */}
      <div className="hidden xl:block w-[350px] border-l border-gray-800 overflow-y-auto h-full">
        <RightPanel />
      </div>
    </div>
  );
};

export default Hero;
