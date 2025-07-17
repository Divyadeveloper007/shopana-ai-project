import React, { useState } from "react";
import {
  User,
  Briefcase
} from "lucide-react";
import SettingsNavigation from "./SettingsNavigation";
import SettingsContent from "./SettingsContent";

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "brandsetup", label: "Brand Setup", icon: Briefcase },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account preferences and configuration
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <SettingsNavigation
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <SettingsContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
