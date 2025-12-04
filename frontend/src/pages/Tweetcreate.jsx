import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateTweetMutation } from "../redux/features/tweet/tweetApi";
import { X } from "lucide-react";

const Tweetcreate = ({ onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");

  const [createTweet, { isLoading }] = useCreateTweetMutation();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    const newTweet = {
      userId: user._id,
      content,
      media: mediaUrl ? [{ url: mediaUrl, type: mediaType }] : [],
    };

    try {
      await createTweet(newTweet).unwrap();
      onClose();
      setContent("");
      setMediaUrl("");
    } catch (error) {
      console.error("Tweet failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
      <div className="bg-[#0f0f0f] text-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-5 text-white">Create Post</h2>

        {/* Tweet Content Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Tweet Content
          </label>
          <textarea
            placeholder="What's happening?"
            className="w-full h-28 p-3 bg-black border border-gray-700 rounded-lg resize-none text-white placeholder-gray-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Media URL Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">
            Media URL (optional)
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
        </div>

        {/* Media Type Select */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-1">Media Type</label>
          <select
            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="gif">GIF</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Tweetcreate;
