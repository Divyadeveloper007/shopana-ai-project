import React, { useRef } from 'react';
import { Upload, Image, X } from 'lucide-react';
import { convertToBase64, removeBackgroundBase64 } from '../../api/auth';

const ImageUploader = ({
  uploadedImage,
  onImageUpload,
  brandLogo,
  onLogoUpload,
}) => {
  const imageInputRef = useRef(null);

  const processImage = async (input, callback, isFile = true) => {
    try {
      let base64;

      if (isFile) {
        base64 = await convertToBase64(input);
      } else {
        const res = await fetch(input);
        const blob = await res.blob();
        base64 = await convertToBase64(blob);
      }

      const processed = await removeBackgroundBase64(base64);
      const finalImage = processed || (isFile ? `data:image/*;base64,${base64}` : input);
      callback(finalImage);
    } catch (error) {
      console.error('⚠️ Image process failed:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processImage(file, onImageUpload, true);
  };

  const handleSampleClick = (url) => {
    processImage(url, onImageUpload, false);
  };

return (
  <div className="space-y-8">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Your Content</h3>
      <p className="text-gray-600 dark:text-gray-400">
        Add your food image to personalize the design
      </p>
    </div>

    {/* Food Image Upload */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Image className="w-5 h-5 text-purple-600" />
        <h4 className="text-md font-semibold text-gray-900 dark:text-white">Food Image</h4>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Required</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div
          onClick={() => imageInputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors flex flex-col items-center justify-center p-6"
        >
          {uploadedImage ? (
            <div className="relative w-full h-full">
              <img
                src={uploadedImage}
                alt="Uploaded food"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageUpload('');
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Upload Food Image</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
                JPG, PNG or WebP<br />
                Max size: 10MB
              </p>
            </>
          )}
        </div>

        {/* Sample Images */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Or choose a sample:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=300',
              'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'
            ].map((sample, index) => (
              <img
                key={index}
                src={sample}
                alt={`Sample ${index + 1}`}
                onClick={() => handleSampleClick(sample)}
                className="aspect-square object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
              />
            ))}
          </div>
        </div>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  </div>
);

};

export default ImageUploader;
