const express = require("express");
const http = require("http"); // for socket server
const connectMd = require("./connection");
const userRoute = require("./routes/user.route.js");
const tweetRoute = require("./routes/tweet.routes.js");
const notificationRoutes = require("./routes/notification.routes.js");
const chatRoutes = require("./routes/chat.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Import socket setup
// const { createSocketServer } = require("./sockets/index.js");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 5000;

// MongoDB connected
connectMd(process.env.MONGODB_URL);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/user", userRoute);
app.use("/api/tweet", tweetRoute);
app.use("/api/notifications", notificationRoutes);
app.use("/chat", chatRoutes);
// Create HTTP server for socket.io
// const httpServer = http.createServer(app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize socket.io server
// const { io } = createSocketServer(httpServer, "http://localhost:5173");
io.on("connection", (socket) => {
  // ...
  console.log("Socket connected");
});
// Make io accessible in controllers
// app.set("io", io);

// Start server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
