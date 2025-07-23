import React from "react";
import { Download, Share2, Edit3, RefreshCw } from "lucide-react";

const PreviewCanvas = ({
  canvasData,
  generatedImage,
  isGenerating,
  onGenerate,
}) => {
  
 const handleDownload = async () => {
  if (generatedImage) {
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "brand-canvas-design.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  }
};

  const handleShare = () => {
    if (navigator.share && generatedImage) {
      navigator.share({
        title: "My Brand Canvas Design",
        text: "Check out my restaurant marketing design!",
        url: generatedImage,
      });
    }
  };

 return (
  <div className="space-y-8">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Review & Generate
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Preview your design and generate the final marketing material
      </p>
    </div>

    {/* Design Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Template */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Template</h4>
        {canvasData.selectedTemplate ? (
          <img
            src={canvasData.selectedTemplate}
            alt="Selected template"
            className="w-full h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300 text-sm">No template</span>
          </div>
        )}
      </div>

      {/* Food Image */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Food Image</h4>
        {canvasData.uploadedImage ? (
          <img
            src={canvasData.uploadedImage}
            alt="Uploaded food"
            className="w-full h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Prompt */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Prompt</h4>
        <div className="bg-white dark:bg-gray-900 rounded-lg p-3 h-20 overflow-y-auto">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {canvasData.prompt || "No text added"}
          </p>
        </div>
      </div>
    </div>

    {/* Generated Result */}
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Generated Design
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          Your AI-powered marketing material
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-80 h-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {isGenerating ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Generating your design...
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  This may take a few moments
                </p>
              </div>
            </div>
          ) : generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated design"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Ready to generate</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Click generate to create your design
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {generatedImage ? (
          <>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span className="hidden md:inline">Download</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="hidden md:inline">Regenerate</span>
            </button>
          </>
        ) : (
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-purple-700 transition-colors text-lg"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden md:inline">Generating...</span>
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5" />
                <span className="hidden md:inline">Generate Design</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>

    {/* Technical Details */}
    {generatedImage && (
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
        <h5 className="font-medium text-gray-900 dark:text-white mb-3">
          Design Specifications
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Format:</span>
            <p className="font-medium text-gray-900 dark:text-white">JPEG</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Dimensions:</span>
            <p className="font-medium text-gray-900 dark:text-white">1080×1080</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Quality:</span>
            <p className="font-medium text-gray-900 dark:text-white">High (300 DPI)</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Size:</span>
            <p className="font-medium text-gray-900 dark:text-white">~2.5 MB</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default PreviewCanvas;
