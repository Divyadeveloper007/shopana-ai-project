import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../contexts/ChatContext";
import { Sparkles, Image as ImageIcon, Loader2, Send, X } from "lucide-react";
import { generatePoster, getBrandProfile } from "../../api/auth";

const InputField = ({ setCurrentView }) => {
  const { currentChatId, createChat, addMessage } = useChat();

  const [message, setMessage] = useState("");
  const [offer, setOffer] = useState(""); // ✅ New offer field
  const [imageFile, setImageFile] = useState(null);
  const [lastImageFile, setLastImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const brandId = localStorage.getItem("brand_id");
  const [brandLogo, setBrandLogo] = useState();

  useEffect(() => {
    const fetchBrandData = async () => {
      if (!brandId) return;

      try {
        const data = await getBrandProfile(brandId);
        setBrandLogo({
          logo_base64: data.logo_base64 || null,
        });
      } catch (error) {
        console.error("Failed to load brand data", error);
      }
    };

    fetchBrandData();
  }, [brandId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() && !imageFile && !lastImageFile) return;

    setLoading(true);
    const chatId = currentChatId || createChat();

    try {
      const fileToSend = imageFile || lastImageFile;

      const userMsg = {
        type: "user",
        text: message || "Please analyze this image",
      };

      if (fileToSend) {
        const localUrl = URL.createObjectURL(fileToSend);
        userMsg.image = localUrl;
      }

      addMessage(chatId, userMsg);

      // Convert file to base64
      const base64Image = fileToSend
        ? await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(fileToSend);
          })
        : null;

      const payload = {
        prompt: message,
        file: base64Image,
        logo: brandLogo?.logo_base64,
        ...(offer.trim() && { offer }), // ✅ Include only if not empty
      };

      console.log("Payload:", payload);

      const result = await generatePoster(payload);

      const aiMsg = {
        type: "bot",
        text: `**${result.headline}**\n\nFont: ${result.metadata.fontColor}`,
        generatedImage: result.posterUrl,
      };

      addMessage(chatId, aiMsg);

      if (imageFile) setLastImageFile(imageFile);
    } catch (error) {
      console.error("Poster Generation Failed:", error);
      addMessage(chatId, {
        type: "bot",
        text: "Something went wrong while generating poster. Please try again.",
        error: true,
      });
    } finally {
      setLoading(false);
      setMessage("");
      setOffer(""); // ✅ Clear offer
      setImageFile(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 sticky bottom-0 z-10">
      <form
        onSubmit={handleSubmit}
        className="flex space-x-2 items-start w-full"
      >
        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm disabled:opacity-50 text-gray-700 dark:text-gray-300"
        >
          <ImageIcon className="w-4 h-4 mr-1" />
          Upload
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Prompt + Offer Input + Preview */}
        <div className="relative flex-1">
          <div className="border rounded-lg px-4 pt-3 pb-2 pr-10 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">

            {/* Image Preview */}
            {imageFile && (
              <div className="relative inline-block mb-2">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setImageFile(null)}
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-full p-1 text-xs text-red-500 hover:bg-red-100 dark:hover:bg-red-800"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {/* Prompt Text Input */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the poster you want..."
              className="w-full outline-none bg-transparent mb-1"
              disabled={loading}
            />

            {/* ✅ Optional Offer Field */}
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Optional offer (e.g. 20% OFF)"
              className="w-full outline-none bg-transparent text-xs text-gray-600 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500"
              disabled={loading}
            />
          </div>

          {/* Sparkle Icon */}
          <Sparkles className="absolute right-3 top-3 text-gray-400 dark:text-gray-500 w-4 h-4" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            loading || (!message.trim() && !imageFile && !lastImageFile)
          }
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send />}
        </button>
      </form>
    </div>
  );
};

export default InputField;
