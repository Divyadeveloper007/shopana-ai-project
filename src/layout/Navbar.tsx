import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
  User,
  Sparkles,
  Menu,
  CreditCard,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { changePasswordApi, resetPasswordApi } from "../api/api";
import ChangePasswordModal from "../authforms/ChangePasswordModal";

interface NavbarProps {
  onMenuClick: () => void;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    
    // Redirect to login
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleChangePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    try {
      const email = localStorage.getItem("user_email") || "";
      await changePasswordApi({
        email,
        oldPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      toast.success("Password changed successfully");
      setShowChangePasswordModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  const handleResetPassword = async (newPassword: string, confirmPassword: string) => {
    try {
      const email = localStorage.getItem("user_email") || "";
      await resetPasswordApi({
        email,
        password: newPassword,
        confirmPassword,
      });
      toast.success("Password reset successfully");
      setShowChangePasswordModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo & Menu */}
          <div className="flex items-center">
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 mr-3"
              onClick={onMenuClick}
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
            {/* User Avatar */}
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 cursor-pointer"
                onClick={toggleDropdown}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base">
                  {localStorage.getItem("user_name")?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-32">
                    {localStorage.getItem("user_name") || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                    {localStorage.getItem("user_email") || "email@example.com"}
                  </p>
                </div>
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 sm:hidden">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {localStorage.getItem("user_name") || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {localStorage.getItem("user_email") || "email@example.com"}
                    </p>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <User className="inline w-4 h-4 mr-2" />
                    Profile
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center sm:hidden">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Credits: 250
                  </button>

                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => {
                      setShowChangePasswordModal(true);
                      closeDropdown();
                    }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </button>

                  <button 
                    className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:hover:bg-red-600/20 flex items-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <ChangePasswordModal 
          onClose={() => setShowChangePasswordModal(false)}
          onSubmit={handleChangePassword}
          onReset={handleResetPassword}
        />
      )}
    </>
  );
};

export default Navbar;