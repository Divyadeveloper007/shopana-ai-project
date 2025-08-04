import React from "react";

const NotificationsTab = ({ settings, onChange }) => {
  const items = [
    { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
    { key: "pushNotifications", label: "Push Notifications", desc: "Browser push notifications" },
    { key: "weeklyReports", label: "Weekly Reports", desc: "Weekly analytics summary" },
    { key: "generationAlerts", label: "Generation Alerts", desc: "Notify when content is ready" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{item.label}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={(e) => onChange(item.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
