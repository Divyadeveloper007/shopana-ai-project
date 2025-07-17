import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import OtpForm from './OtpForm';
import NewPasswordForm from './NewPasswordForm';
import { Sparkles, Zap, Palette } from 'lucide-react';

const AuthPage = () => {
  const [step, setStep] = useState('signin'); // 'signin', 'signup', 'forgot', 'otp', 'newPassword'
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    passwordConfirm: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="w-full max-w-md lg:max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">AI Creative Studio</h1>
          <p className="text-gray-600 text-sm sm:text-base px-2">Automated Image & GIF Generation for Your Business</p>
        </div>

        {/* Features Icons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">AI Automation</p>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <Palette className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">Brand Aware</p>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <Sparkles className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-gray-700">Multi-Platform</p>
          </div>
        </div>

        {/* Dynamic Forms */}
        {step === 'signin' && (
          <SignInForm
            formData={formData}
            handleInputChange={handleInputChange}
            setStep={setStep}
            setEmail={setEmail}
          />
        )}
        {step === 'signup' && (
          <SignUpForm
            formData={formData}
            handleInputChange={handleInputChange}
            setStep={setStep}
          />
        )}
        {step === 'forgot' && (
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            setStep={setStep}
          />
        )}
        {step === 'otp' && (
          <OtpForm
            email={email}
            setStep={setStep}
          />
        )}
        {step === 'newPassword' && (
          <NewPasswordForm
            email={email}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
