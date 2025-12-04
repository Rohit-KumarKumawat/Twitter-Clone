const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["register", "login", "like", "comment"], // event types
      required: true,
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // who triggered
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }, // optional
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
