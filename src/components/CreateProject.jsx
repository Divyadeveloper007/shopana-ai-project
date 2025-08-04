import React, { useState } from 'react';
import { 
  Image, 
  Film, 
  Sparkles, 
  Upload, 
  Type, 
  Palette,
  Wand2,
  Settings,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react';

const CreateProject = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [prompt, setPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const categories = [
    'Product Shot', 'Holiday Promo', 'Logo Animation', 'Social Media Post',
    'Banner Ad', 'Email Header', 'Website Hero', 'Instagram Story'
  ];

  const styles = [
    { name: 'Professional', desc: 'Clean, business-focused' },
    { name: 'Playful', desc: 'Fun, colorful, energetic' },
    { name: 'Minimalist', desc: 'Simple, elegant, modern' },
    { name: 'Vintage', desc: 'Retro, classic styling' },
    { name: 'Bold', desc: 'High contrast, dramatic' },
    { name: 'Organic', desc: 'Natural, earthy tones' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedContent({
        type: activeTab,
        url: activeTab === 'image' 
          ? 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
          : 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        prompt: prompt
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Create New Content
          </h1>
          <p className="text-gray-600">
            Generate AI-powered images and GIFs tailored to your brand
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Creation Panel */}
          <div className="space-y-6">
            {/* Content Type Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'image'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Image className="w-5 h-5 mr-2" />
                  Image
                </button>
                <button
                  onClick={() => setActiveTab('gif')}
                  className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === 'gif'
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Film className="w-5 h-5 mr-2" />
                  GIF
                </button>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Describe Your Vision</h2>
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={`Describe the ${activeTab} you want to create... e.g., "A modern product showcase for our new coffee blend with warm lighting and minimalist design"`}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                
                {/* Quick Prompts */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Quick Prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Holiday Sale', 'New Product Launch', 'Social Media Post', 'Email Banner'].map((quickPrompt) => (
                      <button
                        key={quickPrompt}
                        onClick={() => setPrompt(`Create a ${quickPrompt.toLowerCase()} ${activeTab} for my business`)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        {quickPrompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Category</h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                      selectedCategory === category
                        ? 'border-purple-200 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="text-sm font-medium">{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Style</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                      selectedStyle === style.name
                        ? 'border-purple-200 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="font-medium text-sm">{style.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{style.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating {activeTab}...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate {activeTab}
                </>
              )}
            </button>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
              {isGenerating ? (
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Creating your {activeTab}...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              ) : generatedContent ? (
                <div className="w-full h-full">
                  <img
                    src={generatedContent.url}
                    alt="Generated content"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {activeTab === 'image' ? (
                      <Image className="w-8 h-8 text-gray-400" />
                    ) : (
                      <Film className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600">Your {activeTab} will appear here</p>
                  <p className="text-sm text-gray-500 mt-2">Enter a prompt and click generate to start</p>
                </div>
              )}
            </div>

            {generatedContent && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Generation Details</h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Prompt:</span> {generatedContent.prompt}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Style:</span> {selectedStyle || 'Default'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;