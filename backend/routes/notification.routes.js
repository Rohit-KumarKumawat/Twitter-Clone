// // routes/notification.routes.js
const express = require("express");
const router = express.Router();
const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const verifyToken = require("../middlewares/verifyToken");

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find()
      .populate("actor", "name username pic")
      .populate("tweet", "content")
      .sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

module.exports = router;
