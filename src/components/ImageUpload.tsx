import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageUploadProps {
  uploadedImage: string | null;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

export default function ImageUpload({ uploadedImage, onImageUpload, onImageRemove }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <div className="relative w-full max-w-md mx-auto group">
        <img
          src={uploadedImage}
          alt="Uploaded preview"
          className="w-full h-64 object-cover rounded-2xl shadow-2xl ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-3xl group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={onImageRemove}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full p-2 hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-110 border-2 border-white"
        >
          <X size={14} />
        </button>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center">
          <Sparkles size={12} className="mr-1" />
          Ready to post!
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-md mx-auto border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 relative overflow-hidden ${
        isDragOver
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-105 shadow-xl'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/30 hover:to-purple-50/30 hover:shadow-lg'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ImageIcon className="h-10 w-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">Upload your masterpiece</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">Drag and drop your image here, or click to browse<br />
        <span className="text-sm text-gray-500">Supports JPG, PNG, GIF up to 10MB</span></p>
      
        <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 font-medium">
          <Upload className="mr-2 h-5 w-5" />
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}