import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { forgotPasswordApi } from '../api/auth';

const ForgotPasswordForm = ({ email, setEmail, setStep }) => {
  const [showEmail, setShowEmail] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('resetEmail', email);
      await forgotPasswordApi(email);

      toast.success('OTP sent successfully to your email');
      setStep('otp');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showEmail ? 'text' : 'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your registered email"
            required
          />
          <button
            type="button"
            onClick={() => setShowEmail((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-blue-500"
          >
            {showEmail ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
      >
        Send OTP
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setStep('signin')}
          className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
