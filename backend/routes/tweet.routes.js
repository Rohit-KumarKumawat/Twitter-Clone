const express = require("express");
const router = express.Router();
const Tweet = require("../models/tweet.model").default;
const Comment = require("../models/comment.model").default;
const User = require("../models/user.model");
const Notification = require("../models/notification.model");
const { emitToUser } = require("../sockets/index");
// Create a new tweet
router.post("/create", async (req, res) => {
  try {
    const { userId, content, media } = req.body;

    const tweet = new Tweet({
      user: userId,
      content,
      media,
    });

    await tweet.save();

    res.status(201).json({ message: "Tweet created", tweet });
  } catch (error) {
    console.error("Error creating tweet:", error);
    res.status(500).json({ message: "Failed to create tweet" });
  }
});

// Get all tweets (latest first)
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate("user", "name username email") // show user info
      .populate("replies") // optional: populate replies
      .sort({ createdAt: -1 });

    res.status(200).json({ tweets });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).json({ message: "Failed to fetch tweets" });
  }
});

// Like or Unlike a tweet
router.post("/:id/like", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { userId } = req.body; // actor

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });

    const alreadyLiked = tweet.likes.includes(userId);

    if (alreadyLiked) {
      tweet.likes.pull(userId);
    } else {
      tweet.likes.push(userId);
    }
    await tweet.save();

    // Notify on like (only if not liking own tweet)
    if (!alreadyLiked && String(tweet.user) !== String(userId)) {
      const notif = await Notification.create({
        type: "like",
        actor: userId,
        receiver: tweet.user,
        tweet: tweet._id,
      });

      // populate correctly
      const populated = await Notification.findById(notif._id)
        .populate("actor", "name username pic")
        .populate("tweet", "content");

      const payload = {
        _id: populated._id,
        type: populated.type,
        actor: populated.actor,
        tweet: populated.tweet,
        receiver: populated.receiver,
        read: populated.read,
        createdAt: populated.createdAt,
      };

      const io = req.app.get("io");
      emitToUser(
        io,
        populated.receiver,
        "notification:to:" + String(populated.receiver),
        payload
      );
    }

    res.status(200).json({
      message: alreadyLiked ? "Tweet unliked" : "Tweet liked",
      likes: tweet.likes.length,
    });
  } catch (error) {
    console.error("Error liking tweet:", error);
    res.status(500).json({ message: "Like operation failed" });
  }
});

// Reply to a tweet
router.post("/:id/reply", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { userId, content } = req.body; // actor

    const replyTweet = new Comment({ user: userId, content });
    await replyTweet.save();

    // Add to parent
    const parentTweet = await Tweet.findById(tweetId);
    if (!parentTweet)
      return res.status(404).json({ message: "Tweet not found" });
    parentTweet.replies.push(replyTweet._id);
    await parentTweet.save();

    // Notify tweet owner (if not replying to self)
    if (String(parentTweet.user) !== String(userId)) {
      const notif = await Notification.create({
        type: "comment",
        actor: userId,
        receiver: parentTweet.user,
        tweet: parentTweet._id,
      });

      const io = req.app.get("io");

      // re-fetch with populate
      const populated = await Notification.findById(notif._id)
        .populate("actor", "name username pic")
        .populate("tweet", "content");

      emitToUser(
        io,
        populated.receiver,
        "notification:to:" + String(populated.receiver),
        {
          _id: populated._id,
          type: "comment",
          actor: populated.actor,
          tweet: populated.tweet,
          createdAt: populated.createdAt,
        }
      );
    }

    ////////////////////////////////////////////////////////////////

    res.status(201).json({ message: "Reply added", reply: replyTweet });
  } catch (error) {
    console.error("Error replying to tweet:", error);
    res.status(500).json({ message: "Failed to add reply" });
  }
});

// Delete a tweet
router.delete("/:id", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByIdAndDelete(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    res.status(200).json({ message: "Tweet deleted" });
  } catch (error) {
    console.error("Error deleting tweet:", error);
    res.status(500).json({ message: "Failed to delete tweet" });
  }
});
module.exports = router;
