import React, { useRef, useEffect } from "react";
import { Bot, Download, Edit, Edit2, Eye, Share2 } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import chat from "../../assests/chatai.png";

const PromptOutput = ({ setCurrentView }) => {
  const { messages, currentChatId } = useChat();
  const { user } = useAuth();
  const currentMessages = messages[currentChatId] || [];

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const getInitials = (name) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

  const formatMessage = (text) =>
    text
      ?.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-white dark:bg-gray-900">
      {currentMessages.length === 0 ? (
        <div className="h-full pt-[10%] flex items-center justify-center">
          <div className="text-center max-w-md w-full animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-3xl shadow-lg">
              <img src={chat} alt="shopana ai" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome to ChefBot AI
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Upload a food image or enter a prompt to receive smart AI-powered
              food analysis and image generation.
            </p>
          </div>
        </div>
      ) : (
        <>
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-xl ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="mx-2">
                  {msg.type === "user" ? (
                    user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-8 h-8 rounded-full border"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs">
                        {getInitials(user?.displayName || user?.email)}
                      </div>
                    )
                  ) : (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`p-3 rounded-xl shadow-sm ${
                    msg.type === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "bg-white dark:bg-gray-800 border dark:border-gray-700"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="User upload"
                      className="mb-2 rounded-lg max-h-48 object-cover"
                    />
                  )}

                  {msg.generatedImage && (
                    <div className="relative group mb-2 rounded-lg overflow-hidden max-h-48">
                      <img
                        src={msg.generatedImage}
                        alt="Generated"
                        className="mb-2 rounded-lg max-h-48 object-cover"
                      />

                      {/* Overlay with icons */}
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
                        {/* Download */}
                        <button
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = msg.generatedImage;
                            link.download = "generated-image.jpg";
                            link.click();
                          }}
                          className="bg-white p-2 rounded-full shadow text-gray-800 hover:bg-gray-200"
                          title="Download"
                        >
                          <Download size={20} />
                        </button>

                        {/* View Gallery */}
                        <button
                          onClick={() => setCurrentView("gallery")}
                          title="View Gallery"
                          className="bg-white p-2 rounded-full shadow text-gray-800 hover:bg-gray-200"
                        >
                          <Share2 size={20} />
                        </button>

                        {/* <button
                          onClick={() =>
                            setCurrentView("editor", msg.generatedImage)
                          } // ⬅️ Pass image
                          title="View Editor"
                          className="bg-white p-2 rounded-full shadow text-gray-800 hover:bg-gray-200"
                        >
                          <Edit size={20} />
                        </button> */}
                      </div>
                    </div>
                  )}

                  {msg.text && (
                    <div
                      className={`text-sm ${
                        msg.error
                          ? "text-red-600"
                          : msg.type === "user"
                          ? "text-white"
                          : "text-black dark:text-gray-200"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.text),
                      }}
                    />
                  )}

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};

export default PromptOutput;
