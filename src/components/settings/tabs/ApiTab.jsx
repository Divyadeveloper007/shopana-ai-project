import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ApiTab = ({ settings }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">API Key</h4>
            <p className="text-sm text-gray-600">Use this key to access our API</p>
          </div>
          <button
            onClick={() => setShowKey(!showKey)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-sm">
            {showKey ? settings.apiKey : "••••••••••••••••••••••••••••••••"}
          </code>
          <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            Copy
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">API Usage</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-2xl font-bold text-gray-900">2,847</p>
          <p className="text-xs text-gray-500">API calls</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Rate Limit</p>
          <p className="text-2xl font-bold text-gray-900">1000/hr</p>
          <p className="text-xs text-gray-500">Requests per hour</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Success Rate</p>
          <p className="text-2xl font-bold text-gray-900">99.2%</p>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default ApiTab;
