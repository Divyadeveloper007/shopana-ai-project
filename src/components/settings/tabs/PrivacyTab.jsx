import React from "react";
import { Download, Trash2 } from "lucide-react";

const PrivacyTab = ({ settings, onChange }) => {
  const items = [
    { key: "dataCollection", label: "Data Collection", desc: "Allow collection of usage data to improve service" },
    { key: "analytics", label: "Analytics", desc: "Share anonymous analytics data" },
    { key: "thirdPartySharing", label: "Third-party Sharing", desc: "Share data with trusted partners" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
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

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
      <div className="space-y-4">
        <button className="flex items-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200">
          <Download className="w-5 h-5 mr-2" />
          Download My Data
        </button>
        <button className="flex items-center px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200">
          <Trash2 className="w-5 h-5 mr-2" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default PrivacyTab;
