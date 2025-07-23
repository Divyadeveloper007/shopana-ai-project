// components/BrandCanvas.jsx
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, Eye, Download } from "lucide-react";
import StepIndicator from "./StepIndicator";
import TemplateSelector from "./TemplateSelector";
import ImageUploader from "./ImageUploader";
import PromptInput from "./PromptInput";
import PreviewCanvas from "./PreviewCanvas";
import { createPosterWithTemplate, getBrandProfile } from "../../api/auth";
import GeneratedGallery from "../posts/GeneratedGallery";

const BrandCanvas = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);


  const [canvasData, setCanvasData] = useState({
    selectedTemplate: null,
    uploadedImage: null,
    brandLogo: null,
    prompt: "",
    offer: "",
    brandId: "restaurant_001",
  });

  const brandId = localStorage.getItem("brand_id");

  const [brandLogo, setBrandLogo] = useState();

  const steps = [
    {
      id: 1,
      title: "Choose Template",
      description: "Select a marketing template",
    },
    { id: 2, title: "Upload Image", description: "Add your food image" },
    {
      id: 3,
      title: "Add Details",
      description: "Write your marketing message",
    },
    { id: 4, title: "Preview & Generate", description: "Review and create" },
  ];

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return canvasData.selectedTemplate !== null;
      case 2:
        return canvasData.uploadedImage !== null;
      case 3:
        return canvasData.prompt.trim().length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const result = await createPosterWithTemplate({
        prompt: canvasData.prompt,
        file: canvasData.uploadedImage,
        logo: brandLogo?.logo_base64,
          offer: canvasData.offer, 
        temp_img: canvasData.selectedTemplate,
      });
    setGeneratedImages(prev => [...prev, { posterUrl: result.posterUrl, headline: canvasData.prompt }]);
      setGeneratedImage(result.posterUrl);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
  if (generatedImage) {
    setCurrentStep(4);
  }
}, [generatedImage]);


  const updateCanvasData = (updates) => {
    setCanvasData((prev) => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <TemplateSelector
            selectedTemplate={canvasData.selectedTemplate}
            onTemplateSelect={(template) =>
              updateCanvasData({ selectedTemplate: template })
            }
          />
        );
      case 2:
        return (
          <ImageUploader
            uploadedImage={canvasData.uploadedImage}
            onImageUpload={(image) =>
              updateCanvasData({ uploadedImage: image })
            }
            onLogoUpload={(logo) => updateCanvasData({ brandLogo: logo })}
            brandLogo={canvasData.brandLogo}
          />
        );
      case 3:
        return (
          <PromptInput
            prompt={canvasData.prompt}
            onPromptChange={(prompt) => updateCanvasData({ prompt })}
            offer={canvasData.offer}
            onOfferChange={(offer) => updateCanvasData({ offer })} // ✅ add this
          />
        );

      case 4:
        return (
          <PreviewCanvas
            canvasData={canvasData}
            generatedImage={generatedImage}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Brand Canvas
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Create stunning marketing materials with AI-powered design
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <GeneratedGallery templatePosters={generatedImages} />


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              {renderStepContent()}

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 1
                      ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden md:inline">Previous</span>
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!canGoNext()}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      canGoNext()
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <span className="hidden md:inline">Next Step</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h3>
              </div>

              <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center mb-4">
                {canvasData.selectedTemplate ? (
                  <div className="relative w-full h-full">
                    <img
                      src={canvasData.selectedTemplate}
                      alt="Template"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {canvasData.uploadedImage && (
                      <img
                        src={canvasData.uploadedImage}
                        alt="Uploaded"
                        className="absolute top-1/4 right-1/4 w-[50%] h-[50%] object-cover bg-transparent"
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Preview will appear here
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Template
                  </span>
                  <span
                    className={
                      canvasData.selectedTemplate
                        ? "text-green-600"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    {canvasData.selectedTemplate
                      ? "✓ Selected"
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Food Image
                  </span>
                  <span
                    className={
                      canvasData.uploadedImage
                        ? "text-green-600"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    {canvasData.uploadedImage ? "✓ Uploaded" : "Not uploaded"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Marketing Text
                  </span>
                  <span
                    className={
                      canvasData.prompt
                        ? "text-green-600"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  >
                    {canvasData.prompt ? "✓ Added" : "Not added"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCanvas;
