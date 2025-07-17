import React, { useState, useEffect } from "react";
import PromptGenerator from "./PromptGenerator";
import AIImageGeneration from "./AIImageGeneration";

const PromptToImagePage = () => {
  const [step, setStep] = useState("prompt"); // 'prompt' | 'image'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {step === "prompt" ? (
          <PromptGenerator setSubView={setStep} />
          
        ) : (
          <AIImageGeneration setSubView={setStep} />
        )}
      </div>
    </div>
  );
};

export default PromptToImagePage;
