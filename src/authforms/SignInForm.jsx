import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

const SignInForm = ({ formData, handleInputChange, setStep, setEmail }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false); 
  const handleForgotClick = () => {
    setEmail(formData.email);
    setStep("forgot");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Client-side validation
  if (!formData.email || !formData.password) {
    toast.error("Please enter both email and password");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  try {
    const response = await loginApi(formData);
    const { access_token, role, verified, user_email, user_id } = response;

    const userData = { token: access_token, email: user_email, user_id, role, verified };

    login(userData);
    localStorage.setItem("token", access_token);
    localStorage.setItem("user_email", user_email);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("role", role);
    localStorage.setItem("verified", verified);

    toast.success("Login successful");
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    const errorMsg = err.response?.data?.detail || err.response?.data?.message || "Login failed";

    if (errorMsg.toLowerCase().includes("incorrect password")) {
      toast.error("Incorrect password. Please try again.");
    } else if (errorMsg.toLowerCase().includes("user not found")) {
      toast.error("No account found with this email.");
    } else {
      toast.error(errorMsg);
    }
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
      <p className="text-sm text-gray-600 mb-4">Sign in to your creative workspace</p>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password Field with Show/Hide */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-blue-500 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-between items-center text-sm">
        <div></div>
        <button type="button" onClick={handleForgotClick} className="text-blue-600 hover:underline">
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
      >
        Sign In
      </button>

      {/* Switch to Signup */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setStep("signup")}
          className="text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200"
        >
          Don’t have an account? <span className="underline">Sign up</span>
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
