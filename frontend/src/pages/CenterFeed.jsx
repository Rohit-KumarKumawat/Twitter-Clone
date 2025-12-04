import React from "react";
import { useState } from "react";
import Tweetcreate from "./Tweetcreate";
import TweetList from "./TweetList";
const CenterFeed = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 bg-black z-10 border-b border-gray-800 flex justify-between px-4 py-3 font-bold text-lg">
        <span>For you</span>
        <span>Following</span>
      </div>

      <div className="p-4 border-b border-gray-800">
        <input
          type="text"
          placeholder="What's happening?"
          className="w-full bg-black text-white placeholder-gray-500 text-xl focus:outline-none"
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-4 text-blue-500">
            <span>📷</span>
            <span>📍</span>
            <span>😊</span>
            <span>📅</span>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Post
          </button>
        </div>
      </div>
      <TweetList />
      {isModalOpen && <Tweetcreate onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default CenterFeed;
