import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../api/api";

interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (step: string) => void;
  setEmail: (email: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ 
  formData, 
  handleInputChange, 
  setStep, 
  setEmail 
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotClick = () => {
    setEmail(formData.email);
    setStep("forgot");
  };

 const handleLoginSuccess = (response: {
  access_token: string;
  user_email: string;
  user_id: string;
  role: string;
  verified: boolean;
}) => {
  // Store user data in localStorage
  localStorage.setItem("token", response.access_token);
  localStorage.setItem("user_email", response.user_email);
  localStorage.setItem("user_id", response.user_id);
  localStorage.setItem("role", response.role);
  localStorage.setItem("verified", String(response.verified));

  toast.success("Login successful");
  navigate("/dashboard/post");  // Changed from "/dashboard" to "/dashboard/post"
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Client-side validation
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginApi({
        email: formData.email,
        password: formData.password
      });
      
      handleLoginSuccess(response);
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-blue-500 focus:outline-none"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-between items-center text-sm">
        <div></div>
        <button 
          type="button" 
          onClick={handleForgotClick} 
          className="text-blue-600 hover:underline"
          disabled={isLoading}
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>

      {/* Switch to Signup */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setStep("signup")}
          className={`text-purple-600 hover:text-purple-500 font-medium transition-colors duration-200 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          Don't have an account? <span className="underline">Sign up</span>
        </button>
      </div>
    </form>
  );
};

export default SignInForm;