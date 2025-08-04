import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Settings,
  Sparkles,
  Menu,
  CreditCard,
  Lock,
} from "lucide-react";
import ChangePasswordModal from "../authforms/ChangePasswordModal";
import ThemeToggleButton from "../utils/ThemeToggleButton";

const Navbar = ({ onMenuClick, setCurrentView }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [showChangePassword, setShowChangePassword] = useState(false);

const handleLogout = async () => {
  try {
    const brandId = localStorage.getItem("brand_id");
    const userId = localStorage.getItem("user_id");

    const brandSetupDone = localStorage.getItem(`brandSetupDone-${userId}`);

    await logout();

    // Instead of clear(), just remove login-related items
    localStorage.removeItem("user_id");
    localStorage.removeItem("token"); // If using
    // 🔒 Preserve brandSetupDone & brandId

    if (brandId) {
      localStorage.setItem("brand_id", brandId);
    }

    if (userId && brandSetupDone) {
      localStorage.setItem(`brandSetupDone-${userId}`, brandSetupDone);
    }

    navigate("/auth");
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo & Menu */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 mr-3"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-200" />
          </button>

          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl mr-3">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                AI Creative Studio
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automated Content Creation
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                AI Studio
              </h1>
            </div>
          </div>
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Credits */}
          <div className="hidden sm:flex items-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 px-3 py-2 rounded-lg">
            <CreditCard className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-700 dark:text-white">
              250 Credits
            </span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggleButton />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-purple-200"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                  {getInitials(user?.displayName || user?.email)}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                  {user?.email}
                </p>
              </div>
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 sm:hidden">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* Profile (set view) */}
                <button
                  onClick={() => {
                    setCurrentView?.("settings");
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <User className="inline w-4 h-4 mr-2" />
                  Profile
                </button>


                {/* Credits on Mobile */}
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center sm:hidden">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credits: 250
                </button>

                <hr className="my-1 border-gray-200 dark:border-gray-700" />

                {/* Change Password */}
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:hover:bg-red-600/20 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}

            {showChangePassword && (
              <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
