import React from "react";

const PreferencesTab = ({ settings, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Settings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Image Size</label>
          <select
            value={settings.defaultImageSize}
            onChange={(e) => onChange("defaultImageSize", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="1920x1080">1920x1080 (HD)</option>
            <option value="1080x1080">1080x1080 (Square)</option>
            <option value="1080x1920">1080x1920 (Story)</option>
            <option value="1200x630">1200x630 (Social)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Style</label>
          <select
            value={settings.defaultStyle}
            onChange={(e) => onChange("defaultStyle", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="modern">Modern</option>
            <option value="vintage">Vintage</option>
            <option value="minimalist">Minimalist</option>
            <option value="bold">Bold</option>
            <option value="organic">Organic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quality Preference</label>
          <select
            value={settings.qualityPreference}
            onChange={(e) => onChange("qualityPreference", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="high">High Quality (Slower)</option>
            <option value="medium">Medium Quality</option>
            <option value="fast">Fast Generation</option>
          </select>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Preferences</h3>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Auto-save Projects</h4>
          <p className="text-sm text-gray-600">Automatically save your work</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => onChange("autoSave", e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all"></div>
        </label>
      </div>
    </div>
  );
};

export default PreferencesTab;
