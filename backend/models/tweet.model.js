// models/Tweet.js
import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      maxlength: 280,
    },
    media: [
      {
        url: String,
        type: {
          type: String,
        },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);
const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
