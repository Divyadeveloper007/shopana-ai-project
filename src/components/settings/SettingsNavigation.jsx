import React from "react";

const SettingsNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200
                ${
                  isActive
                    ? "text-purple-600 border-purple-600 bg-purple-50 dark:bg-gray-800 dark:text-purple-400 dark:border-purple-500"
                    : "text-gray-600 border-transparent hover:text-purple-600 hover:border-purple-300 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:border-purple-500"
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsNavigation;
