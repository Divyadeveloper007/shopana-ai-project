// import React, { createContext, useContext, useState } from 'react';

// const BrandContext = createContext();

// export const useBrand = () => {
//   const context = useContext(BrandContext);
//   if (!context) {
//     throw new Error('useBrand must be used within a BrandProvider');
//   }
//   return context;
// };

// export const BrandProvider = ({ children }) => {
//   const [brandSettings, setBrandSettings] = useState({
//     businessName: '',
//     logo: null,
//     primaryColor: '#6366f1',
//     secondaryColor: '#8b5cf6',
//     accentColor: '#06b6d4',
//     fontFamily: 'Inter',
//     brandTone: 'professional',
//     uniqueValue: '',
//     brandPurpose: '',
//     brandPersonality: 'professional',
//     imageryStyle: 'modern',
//     region: 'global',
//     brandAssets: []
//   });

//   const updateBrandSettings = (newSettings) => {
//     setBrandSettings(prev => ({ ...prev, ...newSettings }));
//   };

//   const addBrandAsset = (asset) => {
//     setBrandSettings(prev => ({
//       ...prev,
//       brandAssets: [...prev.brandAssets, asset]
//     }));
//   };

//   const removeBrandAsset = (assetId) => {
//     setBrandSettings(prev => ({
//       ...prev,
//       brandAssets: prev.brandAssets.filter(asset => asset.id !== assetId)
//     }));
//   };

//   const value = {
//     brandSettings,
//     updateBrandSettings,
//     addBrandAsset,
//     removeBrandAsset
//   };

//   return (
//     <BrandContext.Provider value={value}>
//       {children}
//     </BrandContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  // Brand Settings
  const [brandSettings, setBrandSettings] = useState({
    businessName: '',
    logo: null,
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#06b6d4',
    fontFamily: 'Inter',
    brandTone: 'professional',
    uniqueValue: '',
    brandPurpose: '',
    brandPersonality: 'professional',
    imageryStyle: 'modern',
    region: 'global',
    brandAssets: []
  });

  const updateBrandSettings = (newSettings) => {
    setBrandSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addBrandAsset = (asset) => {
    setBrandSettings(prev => ({
      ...prev,
      brandAssets: [...prev.brandAssets, asset]
    }));
  };

  const removeBrandAsset = (assetId) => {
    setBrandSettings(prev => ({
      ...prev,
      brandAssets: prev.brandAssets.filter(asset => asset.id !== assetId)
    }));
  };

  // Extra Logic from Previous Context
  const [brandProfile, setBrandProfile] = useState(null);
  const [generatedPosters, setGeneratedPosters] = useState([]);
const [generatedImages, setGeneratedImages] = useState([
  {
    id: 'default',
    imageUrl: '/default-image.png', // ✅ Or use: "https://via.placeholder.com/400x400?text=No+Image"
    prompt: 'This is a sample prompt generated using AI.',
    createdAt: new Date(),
  },
]);  const [enhancedPrompt, setEnhancedPrompt] = useState('');

  const addGeneratedPoster = (poster) => {
    setGeneratedPosters((prev) => [poster, ...prev]);
  };

  const removeGeneratedPoster = (id) => {
    setGeneratedPosters((prev) => prev.filter((poster) => poster.id !== id));
  };

const addGeneratedImage = (image) => {
  setGeneratedImages([image]); // ✅ Only keep the latest image
};

  const removeGeneratedImage = (id) => {
    setGeneratedImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <BrandContext.Provider
      value={{
        // Brand Settings
        brandSettings,
        updateBrandSettings,
        addBrandAsset,
        removeBrandAsset,

        // Prompt + Poster/Image generation
        brandProfile,
        setBrandProfile,
        generatedPosters,
        addGeneratedPoster,
        removeGeneratedPoster,
        generatedImages,
        addGeneratedImage,
        removeGeneratedImage,
        enhancedPrompt,
        setEnhancedPrompt
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};
