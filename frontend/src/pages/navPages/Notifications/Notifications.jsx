// import React from "react";

// import NotificationsPage from "./NotificationsPage";

// const Notifications = () => {
//   return (
//     <div className="bg-black text-white h-screen w-full overflow-hidden">
//       <div className="flex h-full">
//         {/* Right Feed */}
//         <div className="ml-[70px] sm:ml-[88px] lg:ml-[5px] flex-1 h-full">
//           <NotificationsPage />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;

import React from "react";
import NotificationsPage from "./NotificationsPage";

const Notifications = () => {
  return (
    <div className="bg-black text-white h-screen w-full overflow-hidden">
      <div className="flex h-full">
        {/* Right Feed */}
        <div className="ml-[70px] sm:ml-[88px] lg:ml-[5px] flex-1 h-full">
          <NotificationsPage />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
