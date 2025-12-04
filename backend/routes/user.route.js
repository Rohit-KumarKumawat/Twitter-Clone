const express = require("express");
const router = express.Router();
const User = require("./../models/user.model");
const generateToken = require("../middlewares/generateToken");
const Notification = require("../models/notification.model");
const { emitToUser } = require("../sockets/index");
//for signup user
router.post("/signUp", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = new User({ name, username, email, password });
    await user.save();
    // notification for register user
    const notif = await Notification.create({
      type: "register",
      actor: user._id,
    });

    // optional: emit real-time notification via socket.io
    // Signup
    const io = req.app.get("io");
    emitToUser(io, user._id, "notification:to:" + String(user._id), {
      _id: notif._id,
      type: "register",
      actor: { name: user.name, username: user.username },
      createdAt: notif.createdAt,
    });

    ///////////////////////
    res.status(201).send({ message: "User signup Successfully", user: user });
  } catch (err) {
    console.log("Error occured in Signup :", err);
    res.status(500).send({ message: "Signup failed" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    const match = await user.comparePassword(password);
    if (!match) {
      res.status(401).send({ message: "Invalid password" });
    }
    //Notification for login
    const notif = await Notification.create({
      type: "login",
      actor: user._id,
    });

    const io = req.app.get("io");
    emitToUser(io, user._id, "notification:to:" + String(user._id), {
      type: "login",
      actor: { name: user.name, username: user.username },
      createdAt: notif.createdAt,
    });
    /////////////////////////////////////
    const token = await generateToken(user._id);
    res.cookie("token", String(token), {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).send({
      message: "Login successfully",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error in logging:", error);
    res.status(500).send({ message: "Login failed" });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully" });
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "name username email");
    res.status(200).send({ users: users });
  } catch (error) {
    console.log("Error while fetching user", error);
    res.send({ message: "Failed users fetch" });
  }
});
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ message: "Failed to delete user" });
  }
});
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, name, username, email, password, bio, location, website } =
      req.body;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    // update profile
    if (name !== undefined) user.name = name;
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    await user.save();
    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).send({ message: "Error updating user profile" });
  }
});
module.exports = router;
