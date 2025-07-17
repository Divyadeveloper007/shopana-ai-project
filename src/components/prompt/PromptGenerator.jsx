import React, { useState } from "react";
import { useBrand } from "../../contexts/BrandContext";
import { Copy, ArrowRight, Sparkles } from "lucide-react";
import {
  generateImageFromPrompt,
  generatePoster,
  generatePrompt,
} from "../../api/auth";
import AIImageGeneration from "./AIImageGeneration";

// === Input Component ===
const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
    )}
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />
  </div>
);

const Textarea = ({ value, onChange, rows = 4 }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
  />
);

const Button = ({
  onClick,
  children,
  icon: Icon,
  variant = "primary",
  size = "md",
  disabled = false,
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "text-sm px-3 py-1.5", md: "text-base px-4 py-2" };
  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700",
    secondary:
      "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800",
    outline:
      "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800",
    ghost:
      "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
      disabled={disabled}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

const PromptGenerator = ({ setSubView }) => {
  const { enhancedPrompt, setEnhancedPrompt } = useBrand();
  const [category, setCategory] = useState("");
  const [offerDetails, setOfferDetails] = useState("");
  const [product, setProduct] = useState("");
  const [season, setSeason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showImageSection, setShowImageSection] = useState(true);

  const [generatedImages, setGeneratedImages] = useState([
    {
      id: "default",
      imageUrl: "https://via.placeholder.com/300x300?text=No+Image",
      prompt: "No image generated yet",
      createdAt: new Date(),
    },
  ]);

  const categoryFieldMap = {
    promotion: ["offer_details"],
    product_launch: ["product"],
    social_media: ["offer_details", "product"],
    seasonal_event: ["product", "season"],
  };

  const handleGenerate = async () => {
    const brandId = localStorage.getItem("brand_id");
    if (!brandId || !category) {
      setEnhancedPrompt(
        "Please select a category and make sure your brand is set."
      );
      return;
    }
    setIsLoading(true);
    try {
      const payload = { brandId, templateType: category };
      if (category === "promotion") payload.offer_details = offerDetails;
      if (category === "product_launch") payload.product = product;
      if (category === "social_media") {
        payload.offer_details = offerDetails;
        payload.product = product;
      }
      if (category === "seasonal_event") {
        payload.product = product;
        payload.season = season;
      }

      const prompt = await generatePrompt(payload);
      setEnhancedPrompt(prompt);
    } catch (err) {
      console.error("Prompt fetch error:", err);
      setEnhancedPrompt("Something went wrong while generating the prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateImages = async () => {
    if (!enhancedPrompt.trim()) return;
    setIsGenerating(true);

    try {
      const response = await generateImageFromPrompt(enhancedPrompt);
      const {
        image_id: { image_id: id, image_base64 },
      } = response;

      const imageUrl = `data:image/png;base64,${image_base64}`;

      setGeneratedImages([
        {
          id,
          imageUrl,
          prompt: enhancedPrompt,
          createdAt: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Image generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e, formDataOverride = null) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const formDataToSend = formDataOverride || new FormData();
      if (!formDataOverride) {
        formDataToSend.append("file", formData.file);
        formDataToSend.append("prompt", formData.prompt);
      }

      const data = await generatePoster(formDataToSend);
      setResult(data);
    } catch (error) {
      setErrors({
        submit: "Failed to generate poster. Please try again.",
      });
      setResult({
        posterUrl:
          "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
        headline: "Your Marketing Poster is Ready!",
        metadata: {
          fontColor: "white",
          fontSize: "40px",
          textPosition: "top center",
          logoPosition: "bottom right",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(enhancedPrompt);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const fields = categoryFieldMap[category] || [];
 return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen w-full overflow-y-auto px-4 py-6">
      <div className="max-w-[1600px] mx-auto space-y-6 p-4">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Branded Prompt Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill the form and generate AI image prompts
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Prompt Details
              </h2>

              {/* Category Buttons */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select a Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "promotion", label: "Promotions" },
                    { id: "product_launch", label: "Product Launch" },
                    { id: "social_media", label: "Social Media" },
                    { id: "seasonal_event", label: "Seasonal Events" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCategory(item.id);
                        setOfferDetails("");
                        setProduct("");
                        setSeason("");
                        setEnhancedPrompt("");
                      }}
                      className={`p-3 text-center rounded-lg border transition-all duration-200 ${
                        category === item.id
                          ? "border-purple-200 bg-purple-50 dark:bg-purple-900 text-purple-700"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fields.includes("offer_details") && (
                  <Input
                    label="Offer Details"
                    value={offerDetails}
                    onChange={setOfferDetails}
                    placeholder="e.g. 30% off"
                  />
                )}
                {fields.includes("product") && (
                  <Input
                    label="Product"
                    value={product}
                    onChange={setProduct}
                    placeholder="e.g. New Sneakers"
                  />
                )}
                {fields.includes("season") && (
                  <Input
                    label="Season"
                    value={season}
                    onChange={setSeason}
                    placeholder="e.g. Summer"
                  />
                )}
              </div>

              {/* Generate Prompt Button */}
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleGenerate}
                  disabled={!category || isLoading}
                >
                  {isLoading ? "Generating..." : "Generate Prompt"}
                </Button>
              </div>
            </div>

            {/* Enhanced Prompt Section - Updated */}
            {enhancedPrompt && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow space-y-4">
                {/* Responsive Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between sm:justify-start sm:gap-4 w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Enhanced Prompt
                    </h3>
                    <Button
                      onClick={copyToClipboard}
                      icon={Copy}
                      variant="ghost"
                      size="sm"
                    >
                      Copy
                    </Button>
                  </div>
                  {/* Row 2 */}
                  <div className="sm:mt-0 mt-2">
                    <Button
                      onClick={generateImages}
                      icon={ArrowRight}
                      variant="primary"
                      size="sm"
                    >
                      Generate Images
                    </Button>
                  </div>
                </div>

                {/* Prompt Textarea */}
                <Textarea
                  value={enhancedPrompt}
                  onChange={setEnhancedPrompt}
                  rows={10}
                />
              </div>
            )}
          </div>

          {/* RIGHT SECTION: Image Preview */}
          <div className="w-full lg:w-1/3 overflow-y-auto max-h-screen">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                AI Image Preview
              </h2>
              {showImageSection && (
                <AIImageGeneration
                  generatedImages={generatedImages}
                  isGenerating={isGenerating}
                  enhancedPrompt={enhancedPrompt}
                  onSendPoster={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PromptGenerator;
