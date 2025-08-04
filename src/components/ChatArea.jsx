import React, { useState, useRef, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import { useAuth } from "../contexts/AuthContext";
import { apiService } from "../services/api";
import {
  Upload,
  Send,
  Image as ImageIcon,
  Bot,
  User,
  Loader2,
  Camera,
  Sparkles,
  Plus,
} from "lucide-react";

const ChatArea = () => {
  const { user } = useAuth();
  const { currentChatId, messages, addMessage, createChat } = useChat();

  const currentMessages = messages[currentChatId] || [];

  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  // const messages = getCurrentMessages();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setUploading(true);

    // Ensure we have a chat to add messages to
    let chatId = currentChatId;
    if (!chatId) {
      chatId = createChat(`Chat ${Object.keys(messages).length + 1}`);
    }

    try {
      // Add user message with image
      const userMessage = {
        type: "user",
        image: URL.createObjectURL(file),
        text: "Please analyze this food image",
      };
      addMessage(chatId, userMessage);

      // Call API service (currently mocked)
      const result = await apiService.analyzeImage(file);

      // Add AI response
      const aiMessage = {
        type: "bot",
        text: `**${result.name}**\n\n${result.summary}`,
        foodName: result.name,
        foodSummary: result.summary,
      };
      addMessage(chatId, aiMessage);
    } catch (error) {
      console.error("Error analyzing image:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, I had trouble analyzing that image. Please try again.",
        error: true,
      };
      addMessage(chatId, errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentChatId) return;

    setGenerating(true);

    try {
      // Add user message
      const userMessage = {
        type: "user",
        text: message,
      };
      addMessage(currentChatId, userMessage);

      // Clear input
      const promptText = message;
      setMessage("");

      // Call API service (currently mocked)
      const result = await apiService.generateImage(promptText);

      // Add AI response with generated image
      const aiMessage = {
        type: "bot",
        text: `I've generated a food image based on your prompt: "${promptText}"`,
        generatedImage: result.imageUrl,
      };
      addMessage(currentChatId, aiMessage);
    } catch (error) {
      console.error("Error generating image:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, I had trouble generating that image. Please try again.",
        error: true,
      };
      addMessage(currentChatId, errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";
  };

  const formatMessage = (text) => {
    // Simple markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  if (!currentChatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
            <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Welcome to ChefBot AI
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base px-2">
            Upload a food image to get AI-powered analysis, or start a new chat
            to generate custom food images with text prompts.
          </p>
          <button
            onClick={createNewChat}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            Start New Chat
          </button> 
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 ${
          dragOver
            ? "bg-orange-50 border-2 border-dashed border-orange-300"
            : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {dragOver && (
          <div className="fixed inset-0 bg-orange-100 bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center p-4">
              <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto mb-4" />
              <p className="text-lg sm:text-xl font-semibold text-orange-700">
                Drop your food image here
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[85%] sm:max-w-2xl lg:max-w-3xl ${
                msg.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 ${
                  msg.type === "user" ? "ml-2 sm:ml-3" : "mr-2 sm:mr-3"
                }`}
              >
                {msg.type === "user" ? (
                  user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-orange-200"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                      {getInitials(user?.displayName || user?.email)}
                    </div>
                  )
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-full ${
                  msg.type === "user"
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200"
                } rounded-2xl p-3 sm:p-4 shadow-sm`}
              >
                {msg.image && (
                  <div className="mb-3">
                    <img
                      src={msg.image}
                      alt="Uploaded food"
                      className="max-w-full h-auto rounded-lg shadow-sm max-h-48 sm:max-h-64 object-cover"
                    />
                  </div>
                )}

                {msg.generatedImage && (
                  <div className="mb-3">
                    <img
                      src={msg.generatedImage}
                      alt="Generated food"
                      className="max-w-full h-auto rounded-lg shadow-sm max-h-48 sm:max-h-64 object-cover"
                    />
                  </div>
                )}

                {msg.text && (
                  <div
                    className={`text-sm sm:text-base ${
                      msg.type === "user"
                        ? "text-white"
                        : msg.error
                        ? "text-red-600"
                        : "text-gray-800"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.text),
                    }}
                  />
                )}

                <div
                  className={`text-xs mt-2 ${
                    msg.type === "user" ? "text-orange-100" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}

        {(uploading || generating) && (
          <div className="flex justify-start">
            <div className="flex mr-2 sm:mr-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-blue-500" />
                <span className="text-gray-600 text-sm sm:text-base">
                  {uploading
                    ? "Analyzing your food image..."
                    : "Generating your food image..."}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-3 sm:p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Image Upload */}
          <div className="mb-3 sm:mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) =>
                e.target.files[0] && handleImageUpload(e.target.files[0])
              }
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Upload Food Image</span>
              <span className="sm:hidden">Upload Image</span>
            </button>
          </div>

          {/* Text Input */}
          <form
            onSubmit={handleTextSubmit}
            className="flex space-x-2 sm:space-x-4"
          >
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  currentChatId
                    ? "Describe a food image you'd like me to generate..."
                    : "Start a new chat first"
                }
                disabled={!currentChatId || generating}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-sm sm:text-base"
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={!message.trim() || !currentChatId || generating}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
            >
              {generating ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
