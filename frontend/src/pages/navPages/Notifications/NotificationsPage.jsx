// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import io from "socket.io-client";
// import moment from "moment";
// import { useGetNotificationsQuery } from "../../../redux/features/notification/notificationApi";

// const socket = io("http://localhost:5000");

// const NotificationsPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { data, isLoading } = useGetNotificationsQuery(user?._id);
//   const [liveNotifications, setLiveNotifications] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     // Register user with backend
//     socket.emit("registerUser", user._id);
//     socket.on("notification:to:" + user._id, (notif) => {
//       setLiveNotifications((prev) => [notif, ...prev]);
//     });

//     return () => {
//       socket.off("notification:to:" + user._id);
//     };
//   }, [user]);

//   if (isLoading) return <p className="text-white">Loading notifications...</p>;

//   // Merge DB + Live
//   const allNotifications = [
//     ...liveNotifications,
//     ...(data?.notifications || []),
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">🔔 Notifications</h2>
//       {console.log(liveNotifications)}
//       {allNotifications.length === 0 && (
//         <p className="text-gray-400 text-center">No notifications yet.</p>
//       )}

//       <ul className="space-y-4">
//         {allNotifications.map((n) => (
//           <li
//             key={n._id}
//             className="p-4 rounded-2xl shadow-md bg-gray-900 border border-gray-700 hover:scale-[1.02] transform transition-all duration-200"
//           >
//             {n.type === "register" && (
//               <p>
//                 <span className="font-semibold text-blue-400">
//                   {n.actor?.name}
//                 </span>{" "}
//                 created an account –{" "}
//                 <span className="text-gray-400">
//                   {moment(n.createdAt).fromNow()}
//                 </span>
//               </p>
//             )}
//             {n.type === "login" && (
//               <p>
//                 <span className="font-semibold text-green-400">
//                   {n.actor?.name}
//                 </span>{" "}
//                 logged in at{" "}
//                 <span className="text-gray-400">
//                   {moment(n.createdAt).format("hh:mm A")}
//                 </span>
//               </p>
//             )}
//             {n.type === "like" && (
//               <p>
//                 <span className="font-semibold text-pink-400">
//                   {n.actor?.name}
//                 </span>{" "}
//                 liked a tweet:{" "}
//                 <em className="text-gray-300">"{n.tweet?.content}"</em> –{" "}
//                 <span className="text-gray-400">
//                   {moment(n.createdAt).fromNow()}
//                 </span>
//               </p>
//             )}
//             {n.type === "comment" && (
//               <p>
//                 <span className="font-semibold text-yellow-400">
//                   {n.actor?.name}
//                 </span>{" "}
//                 commented on your tweet:{" "}
//                 <em className="text-gray-300">"{n.tweet?.content}"</em> –{" "}
//                 <span className="text-gray-400">
//                   {moment(n.createdAt).fromNow()}
//                 </span>
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationsPage;

// src/Components/NotificationsPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useGetNotificationsQuery } from "../../../redux/features/notification/notificationApi";
// import { socket } from "../../../Components/Socket"; // ✅ Use shared socket instance

const NotificationsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetNotificationsQuery(user?._id);
  const [liveNotifications, setLiveNotifications] = useState([]);

  // useEffect(() => {
  //   if (!user?._id) return;

  //   // Register logged-in user with backend socket server
  //   socket.emit("registerUser", user._id);

  //   const event = `notification:to:${user._id}`;
  //   const handler = (notif) => {
  //     setLiveNotifications((prev) => [notif, ...prev]);
  //   };

  //   socket.on(event, handler);

  //   return () => {
  //     socket.off(event, handler);
  //   };
  // }, [user?._id]);

  if (isLoading) return <p className="text-white">Loading notifications...</p>;

  const allNotifications = [
    ...liveNotifications,
    ...(data?.notifications || []),
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🔔 Notifications</h2>
      {allNotifications.length === 0 && (
        <p className="text-gray-400 text-center">No notifications yet.</p>
      )}

      <ul className="space-y-4">
        {allNotifications.map((n) => (
          <li
            key={n._id || Math.random()}
            className="p-4 rounded-2xl shadow-md bg-gray-900 border border-gray-700 hover:scale-[1.02] transform transition-all duration-200"
          >
            {n.type === "register" && (
              <p>
                <span className="font-semibold text-blue-400">
                  {n.actor?.name}
                </span>{" "}
                created an account –{" "}
                <span className="text-gray-400">
                  {moment(n.createdAt).fromNow()}
                </span>
              </p>
            )}
            {n.type === "login" && (
              <p>
                <span className="font-semibold text-green-400">
                  {n.actor?.name}
                </span>{" "}
                logged in at{" "}
                <span className="text-gray-400">
                  {moment(n.createdAt).format("hh:mm A")}
                </span>
              </p>
            )}
            {n.type === "like" && (
              <p>
                <span className="font-semibold text-pink-400">
                  {n.actor?.name}
                </span>{" "}
                liked a tweet:{" "}
                <em className="text-gray-300">"{n.tweet?.content}"</em> –{" "}
                <span className="text-gray-400">
                  {moment(n.createdAt).fromNow()}
                </span>
              </p>
            )}
            {n.type === "comment" && (
              <p>
                <span className="font-semibold text-yellow-400">
                  {n.actor?.name}
                </span>{" "}
                commented on your tweet:{" "}
                <em className="text-gray-300">"{n.tweet?.content}"</em> –{" "}
                <span className="text-gray-400">
                  {moment(n.createdAt).fromNow()}
                </span>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
