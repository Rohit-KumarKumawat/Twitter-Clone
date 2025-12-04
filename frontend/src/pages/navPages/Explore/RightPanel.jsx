// src/components/RightPanel.jsx
import React from "react";

const RightPanel = () => {
  return (
    <div className="px-4 py-4 space-y-6">
      {/* Who to follow */}
      <div className="bg-[#16181c] rounded-xl p-4">
        <h2 className="text-white font-bold text-lg mb-3">Who to follow</h2>

        <div className="space-y-4">
          {[
            { name: "Sachin Tendulkar", handle: "@sachin_rt" },
            { name: "Amit Shah", handle: "@AmitShah" },
            { name: "hardik pandya", handle: "@hardikpandya7" },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700" />
                <div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.handle}</p>
                </div>
              </div>
              <button className="bg-white text-black px-4 py-1 rounded-full font-semibold text-sm">
                Follow
              </button>
            </div>
          ))}
          <p className="text-blue-500 hover:underline text-sm cursor-pointer">
            Show more
          </p>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-6">
        Terms of Service • Privacy Policy • Cookie Policy <br />© 2025 X Corp.
      </p>
    </div>
  );
};

export default RightPanel;
