import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logoutUser } from "../redux/features/auth/authSlice";
import xLogo from "../assets/logowhite.png";
import { MoreHorizontal } from "lucide-react";
import Tweetcreate from "./Tweetcreate";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
const menuItems = [
  { name: "Home", path: "/home/hero", icon: HomeIcon },
  { name: "Explore", path: "/home/explore", icon: MagnifyingGlassIcon },
  { name: "Notifications", path: "/home/notifications", icon: BellIcon },
  { name: "Messages", path: "/home/messages", icon: EnvelopeIcon },
  { name: "Grok", path: "/home/grok", icon: SparklesIcon },
  { name: "Communities", path: "/home/communities", icon: UserGroupIcon },
  { name: "Premium", path: "/home/premium", icon: ShieldCheckIcon },
  { name: "Verified Orgs", path: "/home/verifiedorgs", icon: CheckBadgeIcon },
  { name: "Profile", path: "/home/profile", icon: UserIcon },
];

const LeftSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutUserApi] = useLogoutUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fullName = user?.name || "User";
  const username = user?.username || "username";
  const initial = fullName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await logoutUserApi().unwrap();
      dispatch(logoutUser());
      navigate("/login"); // Redirect
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full relative">
      <div>
        <img src={xLogo} alt="X logo" className="w-8 h-8 mb-4" />
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-2 rounded-full cursor-pointer text-lg font-medium ${
                isActive ? "bg-white text-black" : "hover:bg-gray-800"
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-6 relative">
        <button
          className="bg-white text-black rounded-full w-full py-3 font-bold hover:bg-gray-200"
          onClick={() => setIsModalOpen(true)}
        >
          Post
        </button>

        <div className="mt-6 flex items-center justify-between hover:bg-gray-800 p-3 rounded-full cursor-pointer relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              {initial}
            </div>
            <div>
              <p className="font-semibold text-sm">{fullName}</p>
              <p className="text-gray-400 text-sm">@{fullName}</p>
            </div>
          </div>

          <div
            className="p-2 hover:bg-gray-700 rounded-full"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <MoreHorizontal size={20} />
          </div>

          {dropdownOpen && (
            <div className="absolute bottom-[-60px] right-0 bg-white text-black shadow-md rounded-full w-32 z-50">
              <button
                onClick={handleLogout}
                className="w-full bg-white text-black rounded-full  py-3 font-bold hover:bg-gray-200 px-4 text-center "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <Tweetcreate onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default LeftSidebar;
