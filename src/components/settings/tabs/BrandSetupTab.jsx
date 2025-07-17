import React, { useEffect, useState } from "react";
import { Upload, Plus, ImageIcon, Pencil, Save } from "lucide-react";
import axios from "axios";
import { getBrandProfile } from "../../../api/auth";

const fontOptions = ["Inter", "Poppins", "Roboto", "Open Sans"];
const brandTones = [
  { id: "formal", label: "Formal", desc: "Professional and respectful tone" },
  { id: "friendly", label: "Friendly", desc: "Approachable and warm tone" },
  { id: "witty", label: "Witty", desc: "Clever and humorous tone" },
];
const personalities = [
  { id: "bold", label: "Bold" },
  { id: "creative", label: "Creative" },
  { id: "modern", label: "Modern" },
  { id: "professional", label: "Professional" },
];
const imageryStyles = [
  { id: "minimal", label: "Minimal", desc: "Clean and simple design" },
  { id: "vibrant", label: "Vibrant", desc: "Colorful and energetic design" },
  { id: "ethnic", label: "Ethnic", desc: "Traditional and cultural style" },
];
const BrandSetupTab = ({
  brandData,
  setBrandData,
  handleInputChange,
  handleImageUpload,
  handleRemoveImage,
  fontOptions = [],
  brandTones = [],
  personalities = [],
  imageryStyles = [],
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const brandId = localStorage.getItem("brand_id");

  useEffect(() => {
    if (brandId) {
      getBrandProfile(brandId)
        .then((data) => {
          setBrandData({
            businessName: data.name || "",
            primaryColor: data.colors?.[0] || "#000000",
            secondaryColor: data.colors?.[1] || "#000000",
            accentColor: data.colors?.[2] || "#000000",
            fontFamily: data.fonts?.[0] || "",
            brandTone: data.tone?.[0] || "",
            brandPersonality: data.personality || "",
            imageryStyle: data.style || "",
            uniqueValue: data.unique || "",
            brandPurpose: data.purpose || "",
            logo_base64: data.logo_base64 || null,
          });
        })
        .catch((err) => console.error("Failed to load brand data", err));
    }
  }, [brandId]);

  // const handleInputChange = (key, value) => {
  //     setBrandData((prev) => ({ ...prev, [key]: value }));
  //   };

  // const handleRemoveImage = () => {
  //   handleInputChange("logo", null);
  //   handleInputChange("logo_base64", null);
  //   console.log("Removed image:", brandData.logo, brandData.logo_base64);
  // };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Row 1: Heading (always on top in mobile) */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Brand Setup
        </h2>

        {/* Row 2: Buttons (on right in desktop, separate row in mobile) */}
        <div className="flex justify-between gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white border border-purple-600 dark:bg-gray-700 text-gray-800 dark:text-white rounded"
          >
            {isEditing ? (
              "Cancel"
            ) : (
              <span className="inline-flex items-center gap-1">
                <Pencil size={16} className="text-purple-600" />
                Edit
              </span>
            )}
          </button>

          {isEditing && (
            <button
              onClick={() =>
                onSave(brandData, () => {
                  setIsEditing(false);
                })
              }
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Logo Upload */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Brand Logo
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center relative">
          {brandData.logo || brandData.logo_base64 ? (
            <div className="flex justify-center">
              <div className="relative group w-28 text-center">
                <img
                  src={
                    brandData.logo_base64 && !brandData.logo
                      ? brandData.logo_base64
                      : brandData.logo
                      ? URL.createObjectURL(brandData.logo)
                      : null
                  }
                  alt="Logo"
                  className="h-24 w-24 object-contain rounded-lg border"
                />
                {isEditing && (
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ) : isEditing ? (
            <>
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Upload brand image
              </p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="brand-logo"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="brand-logo"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Image
              </label>
            </>
          ) : null}
        </div>
      </div>

      {/* Brand Colors */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Brand Colors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["primaryColor", "secondaryColor", "accentColor"].map((key, i) => (
            <div key={key}>
              <label className="text-sm block mb-1 text-gray-700 dark:text-gray-300">
                {["Primary", "Secondary", "Accent"][i]} Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandData[key] || "#000000"}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-10 h-10 rounded"
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  value={brandData[key] || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full px-2 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Typography
        </h2>
        <label className="text-sm block mb-2 text-gray-700 dark:text-gray-300">
          Primary Font
        </label>
        <select
          value={brandData.fontFamily || ""}
          onChange={(e) => handleInputChange("fontFamily", e.target.value)}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
          disabled={!isEditing}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Tone */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Brand Tone
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brandTones.map((tone) => (
            <button
              key={tone.id}
              onClick={() =>
                isEditing && handleInputChange("brandTone", tone.id)
              }
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                brandData.brandTone === tone.id
                  ? "border-purple-500 bg-purple-50 dark:bg-gray-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                {tone.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {tone.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Brand Personality
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {personalities.map((p) => (
            <button
              key={p.id}
              onClick={() =>
                isEditing && handleInputChange("brandPersonality", p.id)
              }
              className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                brandData.brandPersonality === p.id
                  ? "border-purple-500 bg-purple-50 dark:bg-gray-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <span className="text-gray-900 dark:text-white">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Imagery Style */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Imagery Style
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {imageryStyles.map((style) => (
            <button
              key={style.id}
              onClick={() =>
                isEditing && handleInputChange("imageryStyle", style.id)
              }
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                brandData.imageryStyle === style.id
                  ? "border-purple-500 bg-purple-50 dark:bg-gray-800"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="font-medium text-sm text-gray-900 dark:text-white">
                {style.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {style.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-2 text-gray-700 dark:text-gray-300">
              Business Name
            </label>
            <input
              type="text"
              value={brandData.businessName || ""}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm block mb-2 text-gray-700 dark:text-gray-300">
              What makes you unique?
            </label>
            <textarea
              value={brandData.uniqueValue || ""}
              onChange={(e) => handleInputChange("uniqueValue", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
              rows={3}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="text-sm block mb-2 text-gray-700 dark:text-gray-300">
              Brand Purpose
            </label>
            <textarea
              value={brandData.brandPurpose || ""}
              onChange={(e) =>
                handleInputChange("brandPurpose", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg resize-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
              rows={3}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSetupTab;
