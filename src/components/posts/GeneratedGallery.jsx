import React, { useState, useEffect } from "react";
import {
  Download,
  Share2,
  Send,
  Facebook,
  Image as ImageIcon,
  Sparkles,
  LayoutTemplate,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useChat } from "../../contexts/ChatContext";
import { postToFacebook, postToInstagram, uploadToCloudinary } from "../../api/auth";

const GeneratedGallery = ({ templateGeneratedImages = [] , templatePosters=[]}) => {
  const { messages } = useChat();

  const [activeTab, setActiveTab] = useState("ai"); // "ai" or "template"
  const [uploadedData, setUploadedData] = useState({});
  const [captions, setCaptions] = useState({});
  const [loadingUpload, setLoadingUpload] = useState({});
  const [posting, setPosting] = useState({});
  const [loading, setLoading] = useState(true);

  const aiGeneratedImages = Object.values(messages)
    .flat()
    .filter((msg) => msg.generatedImage);

  useEffect(() => {
    if (aiGeneratedImages.length > 0 || templateGeneratedImages.length > 0) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [messages, templateGeneratedImages]);

  const handleUpload = async (blobUrl, index) => {
    try {
      setLoadingUpload((prev) => ({ ...prev, [index]: true }));
      const secureUrl = await uploadToCloudinary(blobUrl);
      setUploadedData((prev) => ({ ...prev, [index]: secureUrl }));
      toast.success("Uploaded to Cloudinary");
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setLoadingUpload((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handlePost = async (index, platform) => {
    const image_url = uploadedData[index];
    const caption = captions[index] || "";

    if (!image_url) {
      toast.error("Please upload to Cloudinary first");
      return;
    }

    try {
      setPosting((prev) => ({ ...prev, [index]: true }));

      if (platform === "instagram") {
        await postToInstagram(image_url, caption);
        toast.success("Posted to Instagram!");
      } else {
        await postToFacebook(image_url, caption);
        toast.success("Posted to Facebook!");
      }
    } catch (error) {
      toast.error(error.message || `${platform} post failed`);
    } finally {
      setPosting((prev) => ({ ...prev, [index]: false }));
    }
  };

  const displayedImages = activeTab === "ai" ? aiGeneratedImages : templateGeneratedImages;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-y-auto pb-24">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Generated Image Gallery
      </h2>

      {/* Tabs */}
      {/* <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("ai")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "ai"
              ? "bg-purple-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI Generated</span>
        </button>
        <button
          onClick={() => setActiveTab("template")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "template"
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300"
          }`}
        >
          <LayoutTemplate className="w-4 h-4" />
          <span className="hidden sm:inline">Template Posters</span>
        </button>
      </div> */}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center text-gray-600 dark:text-gray-300">
            <div className="animate-spin mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
            <p>Loading your generated images...</p>
          </div>
        </div>
      ) : displayedImages.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-20">
          <ImageIcon className="mx-auto mb-4 w-10 h-10" />
          <p>No images found for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedImages.map((item, index) => {
            const image = item.generatedImage || item.posterUrl;
            const title = item.text || item.headline || `Generated Image ${index + 1}`;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden"
              >
                <img
                  src={image}
                  alt="Generated"
                  className="w-full h-64 object-contain p-2"
                />

                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {title}
                    </span>
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = image;
                        link.download = `generated-${index + 1}.jpg`;
                        link.click();
                      }}
                      title="Download"
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleUpload(image, index)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm flex justify-center items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    {loadingUpload[index] ? "Uploading..." : "Upload to Cloudinary"}
                  </button>

                  {uploadedData[index] && (
                    <>
                      <input
                        type="text"
                        value={captions[index] || ""}
                        onChange={(e) =>
                          setCaptions((prev) => ({ ...prev, [index]: e.target.value }))
                        }
                        placeholder="Enter your caption"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      />

                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePost(index, "instagram")}
                          disabled={posting[index]}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-3 rounded text-sm flex justify-center items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          {posting[index] ? "Posting..." : "Instagram"}
                        </button>

                        <button
                          onClick={() => handlePost(index, "facebook")}
                          disabled={posting[index]}
                          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white py-2 px-3 rounded text-sm flex justify-center items-center gap-2"
                        >
                          <Facebook className="w-4 h-4" />
                          {posting[index] ? "Posting..." : "Facebook"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default GeneratedGallery;
