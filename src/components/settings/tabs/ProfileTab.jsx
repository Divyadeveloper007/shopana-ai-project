import React, { useEffect, useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Upload } from "lucide-react";

const ProfileTab = ({ settings }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Load image from localStorage if available
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

return (
  <div className="space-y-6">
    {/* Profile Picture with Upload Icon */}
    
    <div className="flex justify-center relative">
        
      <div className="w-24 h-24 relative">
        <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            settings.name?.split(" ").map((n) => n[0]).join("") || "JD"
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-1 rounded-full shadow cursor-pointer">
          <Upload className="w-4 h-4 text-purple-600" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>

    {/* Personal Info */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <User className="absolute left-3 top-[38px] w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={settings.name}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled
          />
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <Mail className="absolute left-3 top-[38px] w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="email"
            value={settings.email}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <Lock className="absolute left-3 top-[38px] w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            value={settings.password || ""}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-purple-500 hover:text-blue-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <Lock className="absolute left-3 top-[38px] w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={settings.passwordConfirm || ""}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-purple-500 hover:text-blue-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default ProfileTab;
