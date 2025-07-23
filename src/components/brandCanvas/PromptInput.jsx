import React from 'react';
import { Type, Sparkles, Tag } from 'lucide-react';

const PromptInput = ({ prompt, onPromptChange, offer, onOfferChange }) => {
  const suggestions = [
    "💡 Place your logo at the top center with bold styling for maximum visibility",
    "🖼️ Add a meaningful icon next to your logo for better brand identity",
    "🎯 Keep your main content short, clear, and visually balanced",
    "📍 Align content to the bottom center for a clean layout",
    "✅ Highlight important content with green to draw attention",
    "🎨 Use white space to separate content and make it more readable",
    "🔤 Make your content headline bold and aligned under the logo",
    "🪄 Combine logo and tagline creatively in the content section",
    "🔽 Keep the content flow smooth from logo to bottom CTA",
    "📐 Ensure logo and content spacing feels consistent and modern"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Prompt Creating Section
        </h3>
        <p className="text-green-600 dark:text-green-400">
          Describe how your content should appear visually
        </p>
      </div>

      {/* Prompt Input */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-purple-600" />
          <label className="text-md font-semibold text-gray-900 dark:text-white">
            Prompt Description
          </label>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Ex: Logo top center, content bottom center, green colored text..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          maxLength={200}
        />

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Be specific about position, color, and layout
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {prompt.length}/200
          </p>
        </div>
      </div>

      {/* Offer Input (Optional) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-5 h-5 text-green-600" />
          <label className="text-md font-semibold text-gray-900 dark:text-white">
            Offer (Optional)
          </label>
        </div>

        <input
          type="text"
          value={offer}
          onChange={(e) => onOfferChange(e.target.value)}
          placeholder="Ex: Get 20% OFF today only!"
          className="w-full p-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          maxLength={100}
        />

        <div className="flex justify-end mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {offer?.length || 0}/100
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
            Design Suggestions
          </h4>
        </div>

        <div className="grid gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onPromptChange(suggestion)}
              className="text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900 rounded-lg transition-colors text-sm border border-transparent hover:border-purple-200 dark:hover:border-purple-400 dark:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* AI Enhancement */}
      <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h4 className="text-sm font-medium text-purple-900 dark:text-purple-300">
            AI Layout Assistance
          </h4>
        </div>
        <p className="text-xs text-purple-700 dark:text-purple-400 mb-3">
          Our AI helps refine your layout instructions to improve content balance and visual appeal
        </p>
        <div className="flex flex-wrap gap-2">
          {['Top-center logo', 'Green text style', 'Bottom-aligned content', 'Minimal layout'].map((option) => (
            <span
              key={option}
              className="text-xs bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full border border-purple-200 dark:border-purple-600"
            >
              {option}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
