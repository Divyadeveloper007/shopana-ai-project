import React, { useState, useCallback } from 'react';
import { Zap, Send, Star, Users, TrendingUp, Shield } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import SocialToggle from './components/SocialToggle';
import Toast from './components/Toast';
import { postToSocialMedia } from './api/api';

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', color: 'pink', icon: '📸' },
  { id: 'facebook', name: 'Facebook', color: 'blue', icon: '👥' },
  { id: 'twitter', name: 'Twitter', color: 'sky', icon: '🐦' },
  { id: 'linkedin', name: 'LinkedIn', color: 'blue', icon: '💼' },
];

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'facebook', 'twitter', 'linkedin']);
  const [isPosting, setIsPosting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageRemove = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const handlePlatformToggle = useCallback((platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  }, []);

const handlePost = async () => {
  if (!uploadedImage || selectedPlatforms.length === 0) return;

  setIsPosting(true);

  try {
    const response = await postToSocialMedia({
      caption,
      base64_image: uploadedImage.split(',')[1], // 👈 trim the prefix
    });

    console.log("✅ Upload Response:", response);
    setShowToast(true);
    setTimeout(() => {
      setUploadedImage(null);
      setCaption('');
    }, 1000);
  } catch (error) {
    console.error("❌ Upload Failed:", error);
    alert("❌ Failed to post. Please try again.");
  } finally {
    setIsPosting(false);
  }
};



  const canPost = uploadedImage && selectedPlatforms.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-200/20 rounded-full blur-xl animate-float"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg mr-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SocialSync
            </h1>
          </div>
          <p className="text-2xl font-semibold text-gray-700 max-w-3xl mx-auto mb-4">
            Post to All Platforms in One Click ✨
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your image, craft your caption, and share across all your social media platforms instantly with our AI-powered posting tool
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-500">Posts Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9★</div>
              <div className="text-sm text-gray-500">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">10K+</div>
              <div className="text-sm text-gray-500">Happy Users</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-12 border border-white/20">
            <div className="space-y-12">
              {/* Image Upload */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Upload Your Masterpiece 🎨
                </h2>
                <ImageUpload
                  uploadedImage={uploadedImage}
                  onImageUpload={handleImageUpload}
                  onImageRemove={handleImageRemove}
                />
              </div>

              {/* Caption Input */}
              {uploadedImage && (
                <div className="max-w-md mx-auto animate-fade-in">
                  <label htmlFor="caption" className="block text-xl font-bold text-gray-900 mb-4 text-center">
                    Craft Your Caption ✍️
                  </label>
                  <div className="relative">
                    <textarea
                      id="caption"
                      rows={4}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="What's on your mind? Share your story and inspire others..."
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-300 bg-gray-50/50 backdrop-blur-sm text-gray-700 placeholder-gray-400"
                      maxLength={280}
                    />
                    <div className="absolute bottom-3 right-4 text-sm text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
                      {caption.length}/280
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Toggle */}
              {uploadedImage && (
                <div className="animate-fade-in">
                  <SocialToggle
                    platforms={PLATFORMS}
                    selectedPlatforms={selectedPlatforms}
                    onToggle={handlePlatformToggle}
                  />
                </div>
              )}

              {/* Post Button */}
              {uploadedImage && (
                <div className="text-center animate-fade-in">
                  <button
                    onClick={handlePost}
                    disabled={!canPost || isPosting}
                    className={`inline-flex items-center px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 relative overflow-hidden ${
                      canPost && !isPosting
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {canPost && !isPosting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 animate-shimmer"></div>
                    )}
                    <div className="relative z-10 flex items-center">
                    {isPosting ? (
                      <>
                        <div className="animate-spin rounded-full h-7 w-7 border-b-3 border-white mr-4"></div>
                        Posting Magic ✨
                      </>
                    ) : (
                      <>
                        <Send className="mr-4 h-7 w-7" />
                        Post to {selectedPlatforms.length} Platform{selectedPlatforms.length !== 1 ? 's' : ''} 🚀
                      </>
                    )}
                    </div>
                  </button>
                  
                  {selectedPlatforms.length === 0 && (
                    <p className="text-red-500 text-sm mt-4 bg-red-50 px-4 py-2 rounded-lg inline-block">
                      Please select at least one platform
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">One-Click Magic</h3>
              <p className="text-gray-600 leading-relaxed">Post to multiple platforms simultaneously with just one click.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Platform</h3>
              <p className="text-gray-600 leading-relaxed">Support for Instagram, Facebook, Twitter, LinkedIn, and more.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Time Saving</h3>
              <p className="text-gray-600 leading-relaxed">Save hours with our automated social media management.</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Track performance and optimize your content strategy.</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Go Viral? 🌟</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of creators who trust SocialSync for their social media success</p>
              <div className="flex items-center justify-center space-x-8 text-lg">
                <div className="flex items-center">
                  <Users className="mr-2" />
                  <span>10K+ Users</span>
                </div>
                <div className="flex items-center">
                  <Star className="mr-2" />
                  <span>4.9 Rating</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-2" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        show={showToast}
        message="🎉 Posted Successfully to All Platforms!"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

export default App;