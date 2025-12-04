// // src/Components/socket.js
// import { io } from "socket.io-client";

// // connect to your backend socket server
// export const socket = io("http://localhost:5000", {
//   withCredentials: true,
// });

// src/Components/socket.js
import { io } from "socket.io-client";

// Single shared socket connection for the whole app
export const socket = io("http://localhost:5000", {
  withCredentials: true,
});
