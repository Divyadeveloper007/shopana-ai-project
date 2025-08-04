import React, { useEffect, useState } from "react";
import {
  Upload,
  Palette,
  Type,
  Save,
  Plus,
  X,
  Eye,
  Download,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { saveBrandProfileApi } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BrandSetup = () => {
  const [brandData, setBrandData] = useState({
    logo: null,
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#06b6d4",
    fontFamily: "Inter",
    brandPersonality: "professional",
    brandTone: "professional",
    imageryStyle: "modern",
    businessName: "",
    uniqueValue: "",
    brandPurpose: "",
    region: "global",
  });
const { currentUser } = useAuth();
  const [fontFile, setFontFile] = useState(null);
  // const [uploadedImages, setUploadedImages] = useState([]);

  const brandTones = [
    {
      id: "professional",
      label: "Professional",
      desc: "Formal, trustworthy, authoritative",
    },
    {
      id: "friendly",
      label: "Friendly",
      desc: "Warm, approachable, conversational",
    },
    { id: "witty", label: "Witty", desc: "Clever, humorous, entertaining" },
    {
      id: "empathetic",
      label: "Empathetic",
      desc: "Understanding, caring, supportive",
    },
    {
      id: "authoritative",
      label: "Authoritative",
      desc: "Expert, confident, commanding",
    },
    {
      id: "trendy",
      label: "Trendy",
      desc: "Modern, current, pop culture aware",
    },
  ];

  const personalities = [
    { id: "professional", label: "Professional" },
    { id: "friendly", label: "Friendly" },
    { id: "luxurious", label: "Luxurious" },
    { id: "rebellious", label: "Rebellious" },
    { id: "affordable", label: "Affordable" },
    { id: "competitive", label: "Competitive" },
  ];

  const imageryStyles = [
    { id: "modern", label: "Modern", desc: "Clean, contemporary, minimalist" },
    { id: "vintage", label: "Vintage", desc: "Classic, retro, nostalgic" },
    {
      id: "ethnic",
      label: "Ethnic/Cultural",
      desc: "Traditional, cultural elements",
    },
    {
      id: "cinematic",
      label: "Cinematic",
      desc: "Movie-like, dramatic lighting",
    },
    { id: "natural", label: "Natural", desc: "Organic, earthy, authentic" },
    { id: "urban", label: "Urban", desc: "City-inspired, street style" },
  ];

  const fontOptions = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Montserrat",
    "Poppins",
    "Lato",
    "Source Sans Pro",
    "Nunito",
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const brandId = localStorage.getItem("brand_id");
    if (brandId) {
      toast.info("You have already set up your brand.");
      navigate("/dashboard"); // Or another relevant page
    }
  }, []);

  const handleInputChange = (field, value) => {
    setBrandData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBrandData((prev) => ({
        ...prev,
        logo: file,
      }));
    }
  };

  const handleFontUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFontFile(file); // this will be passed separately to API
      handleInputChange("fontFile", file); // optional, for display
    }
  };

  const handleRemoveImage = () => {
    setBrandData((prev) => ({
      ...prev,
      logo: null,
    }));
  };

const saveBrandSettings = async () => {
  if (!brandData.logo) {
    toast.error("Logo not uploaded");
    return;
  }
  if (!fontFile) {
    toast.error("Font file not uploaded");
    return;
  }

  try {
    const { data, logoBase64 } = await saveBrandProfileApi(brandData, fontFile);

    toast.success("Brand settings saved!");

    localStorage.setItem("brand_id", data.brand_id);
    localStorage.setItem("brand_logo", logoBase64);

    
    const userId = currentUser?.user_id || currentUser?.email;
    if (userId) {
      localStorage.setItem(`brandSetupDone-${userId}`, "true");
    }

    // Reset state
    setBrandData({
      businessName: "",
      logo: null,
      primaryColor: "#6366f1",
      secondaryColor: "#8b5cf6",
      accentColor: "#06b6d4",
      fontFamily: "Inter",
      brandTone: "professional",
      uniqueValue: "",
      brandPurpose: "",
      brandPersonality: "professional",
      imageryStyle: "modern",
      region: "global",
      fontFile: null,
    });

    setFontFile(null);

    const fontInput = document.getElementById("font-upload");
    const logoInput = document.getElementById("brand-images");
    if (fontInput) fontInput.value = "";
    if (logoInput) logoInput.value = "";
  } catch (error) {
    console.error("Save error:", error);
    toast.error("Failed to save brand setup.");
  }
};

  useEffect(() => {
    const brandId = localStorage.getItem("brand_id");
    const isSetupDone = localStorage.getItem("brandSetupDone") === "true";

    if (brandId && isSetupDone) {
      toast.info("You have already set up your brand.");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Brand Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Configure your brand identity to ensure all generated content
            matches your style
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Brand Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Brand Identity
              </h2>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Logo
              </label>

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 mb-4 relative">
                {brandData.logo ? (
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="relative group w-28 text-center">
                      <img
                        src={URL.createObjectURL(brandData.logo)}
                        alt="Brand Logo"
                        className="h-24 w-24 object-contain border rounded-lg shadow-sm mx-auto"
                      />
                      <p className="text-xs mt-1 truncate dark:text-gray-300">
                        {brandData.logo.name}
                      </p>
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Upload brand images
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="brand-images"
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="brand-images"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Images
                    </label>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Brand Colors
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {["primaryColor", "secondaryColor", "accentColor"].map(
                    (key, index) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {["Primary", "Secondary", "Accent"][index]}
                        </span>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={brandData[key]}
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                            className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer hover:border-purple-400 transition-colors"
                          />
                          <input
                            type="text"
                            value={brandData[key]}
                            onChange={(e) =>
                              handleInputChange(key, e.target.value)
                            }
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Visual Identity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Visual Identity
              </h2>

              {/* Font Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Font
                </label>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors duration-200 relative">
                  {!brandData.fontFile ? (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Upload your brand font file (.ttf, .otf, .woff, .woff2)
                      </p>
                      <input
                        type="file"
                        accept=".ttf,.otf,.woff,.woff2"
                        className="hidden"
                        id="font-upload"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFontFile(file);
                            handleInputChange("fontFile", file);
                          }
                        }}
                      />
                      <label
                        htmlFor="font-upload"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors duration-200"
                      >
                        Choose File
                      </label>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Selected Font:</strong>{" "}
                        {brandData.fontFile.name}
                      </p>
                      <button
                        onClick={() => {
                          setFontFile(null);
                          handleInputChange("fontFile", null);
                          document.getElementById("font-upload").value = "";
                        }}
                        className="text-xs text-red-500 hover:underline mt-1"
                      >
                        Remove font
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Typography */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Font
                </label>
                <select
                  value={brandData.fontFamily}
                  onChange={(e) =>
                    handleInputChange("fontFamily", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {fontOptions.map((font) => (
                    <option
                      key={font}
                      value={font}
                      style={{ fontFamily: font }}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Brand Personality */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Brand Personality
              </h2>

              <div className="space-y-6">
                {/* Brand Tone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Brand Tone
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brandTones.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => handleInputChange("brandTone", tone.id)}
                        className={`p-4 text-left rounded-lg border transition-all duration-200 ${
                          brandData.brandTone === tone.id
                            ? "border-purple-200 bg-purple-50 dark:bg-purple-900 text-purple-700"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{tone.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {tone.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Personality
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {personalities.map((personality) => (
                      <button
                        key={personality.id}
                        onClick={() =>
                          handleInputChange("brandPersonality", personality.id)
                        }
                        className={`p-3 text-center rounded-lg border transition-all duration-200 ${
                          brandData.brandPersonality === personality.id
                            ? "border-purple-200 bg-purple-50 dark:bg-purple-900 text-purple-700"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {personality.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Imagery Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Imagery Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {imageryStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          handleInputChange("imageryStyle", style.id)
                        }
                        className={`p-4 text-left rounded-lg border transition-all duration-200 ${
                          brandData.imageryStyle === style.id
                            ? "border-purple-200 bg-purple-50 dark:bg-purple-900 text-purple-700"
                            : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{style.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {style.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={brandData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What makes you unique?
                  </label>
                  <textarea
                    value={brandData.uniqueValue}
                    onChange={(e) =>
                      handleInputChange("uniqueValue", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="Describe what sets your business apart..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand Purpose
                  </label>
                  <textarea
                    value={brandData.brandPurpose}
                    onChange={(e) =>
                      handleInputChange("brandPurpose", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows="3"
                    placeholder="What is your brand's mission and purpose?"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Brand Preview
              </h2>

              {/* Color Preview */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Color Palette
                </h3>
                <div className="flex space-x-2">
                  {["primaryColor", "secondaryColor", "accentColor"].map(
                    (key) => (
                      <div
                        key={key}
                        className="w-12 h-12 rounded-lg border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: brandData[key] }}
                        title={`${key} Color`}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Typography, Brand Summary, Save Button */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Typography
                </h3>
                <div
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  style={{ fontFamily: brandData.fontFamily }}
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {brandData.businessName || "Your Business"}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sample text in your chosen font family
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Brand Summary
                </h3>
                <div className="space-y-2 text-sm">
                  {["brandTone", "brandPersonality", "imageryStyle"].map(
                    (key) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400 capitalize">
                          {key.replace("brand", "")}:
                        </span>
                        <span className="text-gray-900 dark:text-white capitalize">
                          {brandData[key]}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={saveBrandSettings}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Brand Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BrandSetup;
