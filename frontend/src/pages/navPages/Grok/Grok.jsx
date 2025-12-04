import React from "react";
import ChatWindow from "./ChatWindow";

const Grok = () => {
  return (
    <div className="flex-1 ml-[275px] flex">
      <div className="flex-1 max-w-2xl border-x border-gray-800 overflow-y-auto">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Grok;
