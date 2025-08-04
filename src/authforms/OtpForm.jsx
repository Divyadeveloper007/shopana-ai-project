import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { verifyOtpApi } from '../api/auth';

const OtpForm = ({ setStep }) => {
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem('resetEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyOtpApi({ email, otp });
      toast.success('OTP verified successfully');
      setStep('newPassword'); 
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter OTP sent to your email"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpForm;
