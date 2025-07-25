import React from 'react';

interface Platform {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface SocialToggleProps {
  platforms: Platform[];
  selectedPlatforms: string[];
  onToggle: (platformId: string) => void;
}

export default function SocialToggle({ platforms, selectedPlatforms, onToggle }: SocialToggleProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Choose Your Platforms</h3>
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <button
              key={platform.id}
              onClick={() => onToggle(platform.id)}
              className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group ${
                isSelected
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-700 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 text-gray-600 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/30 hover:shadow-md hover:scale-102'
              }`}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-pulse"></div>
              )}
              <div className="relative z-10 flex items-center">
                <span className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-200">{platform.icon}</span>
                <span className="font-semibold">{platform.name}</span>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-sm text-gray-500 mt-4">
        {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''} selected
      </p>
    </div>
  );
}