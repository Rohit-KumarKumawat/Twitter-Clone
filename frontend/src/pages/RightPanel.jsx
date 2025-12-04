import React from "react";

const RightPanel = () => {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="sticky top-0 bg-black z-10 pb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 text-white placeholder-gray-400 p-3 rounded-full focus:outline-none"
        />
      </div>

      <div className="bg-[#16181c] mt-4 rounded-xl p-4">
        <h2 className="font-bold text-xl mb-2">Subscribe to Premium</h2>
        <p className="text-sm text-gray-400 mb-2">
          Unlock new features and if eligible, receive a share of revenue.
        </p>
        <button className="bg-blue-500 text-white rounded-full px-4 py-2 font-semibold">
          Subscribe
        </button>
      </div>

      <div className="bg-[#16181c] mt-4 rounded-xl p-4">
        <h2 className="font-bold text-xl mb-4">What’s happening</h2>
        <div className="text-sm text-gray-400 space-y-2">
          <p>#Sensex</p>
          <p>#KanwarYatra2025</p>
          <p>#Saiyaara</p>
          <p>#Remove_Fixpay_in_gujarat</p>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
