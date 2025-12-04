// src/components/TweetList.jsx
import React, { useState } from "react";
import { FaCheckCircle, FaRegComment, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import { PiBookmarkSimpleLight, PiShareFatLight } from "react-icons/pi";
import {
  useGetAllTweetsQuery,
  useLikeTweetMutation,
  useReplyToTweetMutation,
} from "../redux/features/tweet/tweetApi";
import moment from "moment";
import { useSelector } from "react-redux";

const TweetList = () => {
  const { data, isLoading, isError } = useGetAllTweetsQuery();
  const [likeTweet] = useLikeTweetMutation();
  const [replyToTweet] = useReplyToTweetMutation();
  const user = useSelector((state) => state.auth.user);

  const [replyingTo, setReplyingTo] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  if (isLoading) return <p className="text-white p-4">Loading tweets...</p>;
  if (isError)
    return <p className="text-red-500 p-4">Failed to load tweets.</p>;

  const handleLike = async (tweetId) => {
    if (!user) return alert("Please login first!");
    try {
      await likeTweet({ tweetId, userId: user._id });
    } catch (err) {
      console.error("Error liking tweet", err);
    }
  };

  const handleReply = async (tweetId) => {
    if (!user) return alert("Please login first!");
    if (!replyContent.trim()) return;
    try {
      await replyToTweet({
        tweetId,
        userId: user._id,
        content: replyContent,
      });
      setReplyContent("");
      setReplyingTo(null);
    } catch (err) {
      console.error("Error replying to tweet", err);
    }
  };

  return (
    <div>
      {data?.tweets?.map((tweet) => (
        <div
          key={tweet._id}
          className="p-4 border-b border-[#2f3336] hover:bg-[#16181c] transition-colors duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              {tweet.user?.pic ? (
                <img
                  src={tweet.user.pic}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  {tweet.user?.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1 text-white font-bold">
                  {tweet.user?.name}
                  <FaCheckCircle className="text-[#1d9bf0] text-[15px]" />
                  <span className="text-gray-500 font-normal text-sm ml-2">
                    {tweet.user?.username} · {moment(tweet.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-gray-400 cursor-pointer">⋯</div>
          </div>

          {/* Content */}
          {tweet.content && (
            <div className="mt-2 text-white text-[15px]">{tweet.content}</div>
          )}

          {/* Media */}
          {Array.isArray(tweet.media) && tweet.media.length > 0 && (
            <div className="mt-3 space-y-2">
              {tweet.media.map((mediaItem, i) => (
                <div
                  key={i}
                  className="border border-[#2f3336] rounded-2xl overflow-hidden"
                >
                  {mediaItem.type === "video" ? (
                    <video
                      controls
                      src={mediaItem.url}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <img
                      src={mediaItem.url}
                      alt="tweet-media"
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between mt-3 text-gray-500 text-sm px-2">
            <div
              className="flex items-center gap-2 hover:text-[#1d9bf0] cursor-pointer"
              onClick={() => setReplyingTo(!replyingTo)}
            >
              <FaRegComment />
              <span>{tweet.replies?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#00ba7c] cursor-pointer">
              <FaRetweet />
              <span>{tweet.retweets || 0}</span>
            </div>
            <div
              className="flex items-center gap-2 hover:text-pink-500 cursor-pointer"
              onClick={() => handleLike(tweet._id)}
            >
              <AiOutlineHeart />
              <span>{tweet.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#1d9bf0] cursor-pointer">
              <AiOutlineBarChart />
              <span>{tweet.views || "0"}</span>
            </div>
            <div className="flex items-center gap-4">
              <PiBookmarkSimpleLight className="hover:text-[#1d9bf0] cursor-pointer" />
              <PiShareFatLight className="hover:text-[#1d9bf0] cursor-pointer" />
            </div>
          </div>

          {/* Reply Box */}
          {replyingTo === true && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 bg-transparent border border-gray-600 rounded-lg text-white"
              />
              <button
                onClick={() => handleReply(tweet._id)}
                className="px-4 py-2 bg-[#1d9bf0] text-white rounded-lg"
              >
                Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TweetList;
