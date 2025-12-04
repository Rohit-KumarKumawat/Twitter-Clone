// src/components/CenterFeed.jsx
import React from "react";

const CenterFeed = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-between border-b border-gray-700 pb-2">
        <button className="text-white font-semibold border-b-4 border-blue-500 pb-2">
          For You
        </button>
        <button className="text-gray-500 hover:text-white">Trending</button>
        <button className="text-gray-500 hover:text-white">News</button>
        <button className="text-gray-500 hover:text-white">Sports</button>
        <button className="text-gray-500 hover:text-white">
          Entertainment
        </button>
      </div>

      {/* Example Feed */}
      <div className="mt-6 space-y-6">
        <h2 className="text-xl font-bold">Today's News</h2>
        <div>
          <p className="font-semibold text-white">
            Chris Paul Returns to Clippers for His 21st NBA Season
          </p>
          <p className="text-sm text-gray-500">
            2 hours ago • Sports • 25K posts
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">
            Powell Referred to DOJ Over Federal Reserve Building Renovation
          </p>
          <p className="text-sm text-gray-500">
            Trending now • News • 4.6K posts
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">
            Malcolm-Jamal Warner, 'Cosby Show' Star, Dies at 54
          </p>
          <p className="text-sm text-gray-500">
            Trending now • News • 4.6K posts
          </p>
        </div>
      </div>
    </div>
  );
};

export default CenterFeed;
