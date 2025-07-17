import React from "react";
import { Plus, Camera } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";

const CurrentChatHeader = () => {
  const { createChat } = useChat();

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon Container */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
          <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Welcome to ChefBot AI
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base px-2">
          Upload a food image to get AI-powered analysis, or start a new chat to
          generate custom food images with text prompts.
        </p>

        {/* Button */}
        <button
          onClick={() => createChat("New Chat")}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
          Start New Chat
        </button>
      </div>
    </div>
  );
};

export default CurrentChatHeader;
