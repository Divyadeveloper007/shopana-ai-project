import React, { useEffect } from "react";
import {
  Home,
  Plus,
  Palette,
  X,
  FolderPlus,
  MessageCircle,
  Trash2,
  Images,
  LayoutTemplate,
  Settings,
  Layers,
} from "lucide-react";
import { useChat } from "../contexts/ChatContext";
import { deletePosterById } from "../api/auth";
import { toast } from "react-toastify";

const Sidebar = ({ onClose, currentView, setCurrentView }) => {
  const {
    chats,
    currentChatId,
    setCurrentChatId,
    createChat,
    deleteChat,
    // fetchAllChats,
  } = useChat();
 const userId = localStorage.getItem("user_id");
const brandId = localStorage.getItem("brand_id");

let isBrandSetupDone = false;

if (userId) {
  const setupStatus = localStorage.getItem(`brandSetupDone-${userId}`);
  isBrandSetupDone = setupStatus === "true";
}

console.log("userId:", userId);
console.log("brandId:", brandId);
console.log("brandSetupDone:", isBrandSetupDone);

// Now use the flag correctly
const menuItems = [
  !isBrandSetupDone && { id: "brand", label: "Brand Setup", icon: Palette },
  { id: "home", label: "Dashboard", icon: Home },
  { id: "canvas", label: "Brand Canvas", icon: Palette },
  { id: "create", label: "Create Prompt", icon: FolderPlus },
  { id: "gallery", label: "Image Gallery", icon: Images },
  { id: "templates", label: "Templates", icon: Layers },
  { id: "settings", label: "Settings", icon: Settings },
].filter(Boolean);


  // useEffect(() => {
  //   fetchAllChats();
  // }, []);

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    onClose?.();
  };

  const handleNewChat = () => {
    createChat("Untitled Chat");
    setCurrentView("home");
    onClose?.();
  };

  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId);
    setCurrentView("home");
    onClose?.();
  };

  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();

    try {
      await deletePosterById(chatId);
      deleteChat(chatId); // local state cleanup
      toast.success("Poster deleted successfully");
    } catch (err) {
      toast.error(err.message || "Failed to delete poster");
    }
  };

  return (
    <div className="w-64 sm:w-72 lg:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full max-h-screen overflow-y-auto lg:overflow-y-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4 lg:mb-0 lg:justify-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white lg:hidden">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Chat
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-purple-600 dark:text-purple-400" : ""
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Recent Chats */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
            Recent Chats
          </h3>
          <div className="space-y-2">
            {chats.length === 0 ? (
              <div className="text-center py-6 sm:py-8">
                <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No chats yet</p>
                <p className="text-gray-400 text-xs">
                  Start a new chat to begin
                </p>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  className={`relative group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    currentChatId === chat.id
                      ? "bg-purple-100 dark:bg-purple-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MessageCircle
                      className={`w-4 h-4 ${
                        currentChatId === chat.id
                          ? "text-purple-600 dark:text-purple-300"
                          : "text-gray-400"
                      }`}
                    />
                    <div className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
                      {chat.name || "Untitled Chat"}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="block lg:opacity-0 lg:group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Hover Image Preview */}
                  {/* {chat.poster?.image_url && (
                    <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                      <img
                        src={chat.poster.image_url.startsWith('http') ? chat.poster.image_url : `http://192.168.1.5:9007${chat.poster.image_url}`}
                        alt="preview"
                        className="w-32 h-auto rounded-lg shadow-lg border"
                      />
                    </div>
                  )} */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
