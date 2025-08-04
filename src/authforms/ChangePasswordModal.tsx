import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  onReset: (newPassword: string, confirmPassword: string) => Promise<void>;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ 
  onClose, 
  onSubmit,
  onReset
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isResetMode, setIsResetMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (isResetMode) {
        await onReset(password, passwordConfirm);
      } else {
        await onSubmit(oldPassword, password, passwordConfirm);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-lg font-bold mb-4">
          {isResetMode ? "Reset Password" : "Change Password"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password - Only shown in change mode */}
          {!isResetMode && (
            <div>
              <label className="block mb-1 text-sm font-medium">Old Password</label>
              <div className="relative">
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  required={!isResetMode}
                />
                <span
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>
          )}

          {/* New Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              {isResetMode ? "New Password" : "New Password"}
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <span
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-4 py-2 pr-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="text-sm text-right">
            <button
              type="button"
              onClick={() => setIsResetMode(!isResetMode)}
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              {isResetMode ? "Change Password Instead?" : "Forgot Password? Reset Instead"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;