import React from "react";
import {
  Globe2,
  Home,
  Layers,
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, currentView, setCurrentView }) => {
  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "post", label: "Post to Platforms", icon: Layers },
    { id: "social_media_manager", label: "Social Media Manager", icon: Globe2  },
  ];

  return (
    <div className="w-64 sm:w-72 lg:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full max-h-screen overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  currentView === item.id
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
                onClick={() => {
                  setCurrentView(item.id);
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;