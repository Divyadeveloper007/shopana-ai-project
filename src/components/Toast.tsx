import React, { useEffect } from 'react';
import { CheckCircle, X, Sparkles } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

export default function Toast({ show, message, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center max-w-sm border border-green-400/20 backdrop-blur-sm">
        <div className="relative mr-4">
          <CheckCircle className="h-6 w-6 flex-shrink-0" />
          <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-green-100 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}