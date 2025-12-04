// socket/index.js
const { Server } = require("socket.io");

// userId -> Set<socketId> (supports multiple tabs/devices)
const userSockets = new Map();

function createSocketServer(httpServer, corsOrigin) {
  const io = new Server(httpServer, {
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // client should emit: socket.emit('registerUser', userId)
    socket.on("registerUser", (userId) => {
      if (!userId) return;
      const set = userSockets.get(userId) || new Set();
      set.add(socket.id);
      userSockets.set(userId, set);
    });

    socket.on("disconnect", () => {
      for (const [userId, set] of userSockets.entries()) {
        if (set.has(socket.id)) {
          set.delete(socket.id);
          if (set.size === 0) userSockets.delete(userId);
          break;
        }
      }
    });
  });

  return { io };
}

// Helper: emit to all sockets of a user
function emitToUser(io, userId, event, payload) {
  const set = userSockets.get(String(userId));
  if (!set) return;
  for (const sid of set) io.to(sid).emit(event, payload);
}

module.exports = { createSocketServer, emitToUser };
