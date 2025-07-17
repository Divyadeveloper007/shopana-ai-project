import React from "react";
import { Download, Send, Sparkles } from "lucide-react";

const AIImageGeneration = ({
  generatedImages,
  isGenerating,
  enhancedPrompt,
  onSendPoster,
}) => {
  const hasGeneratedImages =
    generatedImages.length > 0 &&
    !(generatedImages.length === 1 && generatedImages[0].id === "default");

  const handleDownload = (imageUrl, fileName = 'poster.png') => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendPoster = (img) => {
    // Construct the formData as required by handleSubmit
    const blob = dataURItoBlob(img.imageUrl);
    const formData = new FormData();
    formData.append('file', blob, 'poster.png');
    formData.append('prompt', img.prompt);

    if (typeof onSendPoster === 'function') {
      onSendPoster({ preventDefault: () => {} }, formData); // mimic event + formData
    }
  };

  // Helper function to convert base64 to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return isGenerating ? (
    <div className="text-center py-6">
      <p className="text-gray-500 dark:text-gray-400">Generating image...</p>
    </div>
  ) : hasGeneratedImages ? (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {generatedImages.map((img) => (
          <div key={img.id} className="space-y-4">
            <img
              src={img.imageUrl}
              alt="Generated"
              className="w-full rounded-xl shadow object-cover"
            />

            <div className="border border-gray-300 dark:border-gray-600 p-4 m-2 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Prompt:
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {img.prompt}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Download Button */}
              <button
                onClick={() => handleDownload(img.imageUrl)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Download size={18} />
                Download
              </button>

              {/* Post Image Button */}
              <button
                onClick={() => handleSendPoster(img)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                <Send size={18} />
                Post Image
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-center items-center text-gray-300 mb-6">
        <Sparkles size={40} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No images generated yet
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Generate your first image above.
      </p>

      <div className="border border-gray-300 dark:border-gray-600 p-4 m-2 rounded-lg max-w-md mx-auto">
        <h4 className="text-left text-sm font-medium text-gray-700 dark:text-white mb-1">
          Prompt:
        </h4>
        <p className="text-sm italic text-gray-600 dark:text-gray-400">
          {enhancedPrompt ? `"${enhancedPrompt}"` : "Prompt will show here."}
        </p>
      </div>
    </div>
  );
};

export default AIImageGeneration;



// import React, { useState, useEffect } from "react";
// import { useBrand } from "../../contexts/BrandContext";
// import {
//   Sparkles,
//   Download,
//   RefreshCw,
//   ArrowLeft,
//   ArrowRight,
//   Trash2,
// } from "lucide-react";
// import { generateImageFromPrompt, getImageUrlById } from "../../api/auth";
// import PreviouslyGeneratedImage from "./PreviouslyGeneratedImage";

// // ==== UI COMPONENTS INLINED ====

// const Textarea = ({ label, value, onChange, placeholder, rows = 4 }) => (
//   <div>
//     {label && (
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//         {label}
//       </label>
//     )}
//     <textarea
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       rows={rows}
//       className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     />
//   </div>
// );

// const Select = ({ label, value, onChange, options, placeholder, required }) => (
//   <div>
//     {label && (
//       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//         {label}
//       </label>
//     )}
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       required={required}
//       className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     >
//       {placeholder && <option value="">{placeholder}</option>}
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const Button = ({
//   onClick,
//   children,
//   icon: Icon,
//   variant = "primary",
//   size = "md",
//   disabled = false,
//   className = "",
// }) => {
//   const base =
//     "inline-flex items-center justify-center font-medium rounded-md transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2";
//   const sizes = {
//     sm: "text-sm px-3 py-1.5",
//     md: "text-base px-4 py-2",
//     lg: "text-lg px-5 py-2.5",
//   };
//   const variants = {
//     primary:
//       "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
//     secondary:
//       "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
//     outline:
//       "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-400",
//     ghost:
//       "bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:ring-gray-300",
//   };
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${base} ${sizes[size]} ${variants[variant] || ""} ${
//         disabled ? "opacity-50 cursor-not-allowed" : ""
//       } ${className}`}
//     >
//       {Icon && <Icon className="w-4 h-4 mr-2" />}
//       {children}
//     </button>
//   );
// };

// // ==== MAIN COMPONENT ====

// const AIImageGeneration = ({ setSubView }) => {
//   const {
//     brandProfile,
//     generatedImages,
//     addGeneratedImage,
//     removeGeneratedImage,
//     enhancedPrompt,
//     setEnhancedPrompt,
//   } = useBrand();

//   const [styledPrompt, setStyledPrompt] = useState("");
//   const [resolution, setResolution] = useState("1024x1024");
//   const [imageStyle, setImageStyle] = useState("");
//   const [numberOfImages, setNumberOfImages] = useState("1");
//   const [isGenerating, setIsGenerating] = useState(false);

//   useEffect(() => {
//     if (enhancedPrompt && !styledPrompt) {
//       setStyledPrompt(enhancedPrompt);
//     }
//   }, [enhancedPrompt, styledPrompt]);

//   const resolutionOptions = [
//     { value: "512x512", label: "512×512 (Small)" },
//     { value: "768x768", label: "768×768 (Medium)" },
//     { value: "1024x1024", label: "1024×1024 (Large)" },
//   ];

//   const styleOptions = [
//     { value: "realistic", label: "Realistic" },
//     { value: "sketch", label: "Sketch" },
//     { value: "3d-render", label: "3D Render" },
//     { value: "anime", label: "Anime" },
//     { value: "digital-art", label: "Digital Art" },
//     { value: "vintage", label: "Vintage" },
//     { value: "ethnic-motif", label: "Ethnic Motif" },
//   ];

//   const numberOfImagesOptions = [
//     { value: "1", label: "1 Image" },
//     { value: "2", label: "2 Images" },
//     { value: "3", label: "3 Images" },
//     { value: "4", label: "4 Images" },
//   ];

//   const sampleImages = {
//     realistic: [
//       "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg",
//       "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg",
//       "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
//       "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
//     ],
//     sketch: [
//       "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg",
//       "https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg",
//     ],
//     "digital-art": [
//       "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
//       "https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg",
//     ],
//   };

//   // const generateImages = async () => {
//   //   if (!styledPrompt.trim()) return;
//   //   setIsGenerating(true);
//   //   await new Promise((r) => setTimeout(r, 3000));
//   //   const num = parseInt(numberOfImages);
//   //   const styleSet = sampleImages[imageStyle] || sampleImages.realistic;
//   //   for (let i = 0; i < num; i++) {
//   //     const randomImage = styleSet[Math.floor(Math.random() * styleSet.length)];
//   //     addGeneratedImage({
//   //       id: `${Date.now()}-${i}`,
//   //       imageUrl: randomImage,
//   //       prompt: styledPrompt,
//   //       resolution,
//   //       style: imageStyle,
//   //       createdAt: new Date(),
//   //     });
//   //   }
//   //   setIsGenerating(false);
//   // };

//   const generateImages = async () => {
//     if (!styledPrompt.trim()) return;
//     setIsGenerating(true);

//     try {
//       const response = await generateImageFromPrompt(styledPrompt); // API CALL

//       const { image_id } = response;

//       // ✅ Add MIME prefix to base64 (assuming PNG format)
//       const imageUrl = `data:image/png;base64,${image_id.image_base64}`;

//       addGeneratedImage({
//         id: image_id.image_id,
//         imageUrl, // ✅ Now has correct format: data:image/png;base64,...
//         prompt: styledPrompt,
//         resolution,
//         style: imageStyle,
//         createdAt: new Date(),
//       });
//     } catch (err) {
//       console.error("Image generation error:", err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const regenerateImage = async (image) => {
//     setIsGenerating(true);
//     await new Promise((r) => setTimeout(r, 2000));
//     const styleSet = sampleImages[image.style] || sampleImages.realistic;
//     const newImage = styleSet[Math.floor(Math.random() * styleSet.length)];
//     removeGeneratedImage(image.id);
//     addGeneratedImage({
//       ...image,
//       id: Date.now().toString(),
//       imageUrl: newImage,
//       createdAt: new Date(),
//     });
//     setIsGenerating(false);
//   };
//   const downloadImage = (image) => {
//     const isBase64 = image.imageUrl.startsWith("data:image");

//     if (isBase64) {
//       try {
//         const base64Data = image.imageUrl.split(",")[1];
//         const mimeString = image.imageUrl
//           .split(",")[0]
//           .split(":")[1]
//           .split(";")[0]; // e.g., image/png
//         const ext = mimeString.split("/")[1]; // Get file extension like 'png' or 'jpeg'

//         const byteString = atob(base64Data); // Decode base64 string
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);

//         for (let i = 0; i < byteString.length; i++) {
//           ia[i] = byteString.charCodeAt(i);
//         }

//         const blob = new Blob([ab], { type: mimeString });
//         const url = URL.createObjectURL(blob);

//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `ai-image-${image.id}.${ext}`; // use correct extension
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         URL.revokeObjectURL(url); // cleanup
//       } catch (error) {
//         console.error("Failed to download base64 image:", error);
//       }
//     } else {
//       // For non-base64 image URLs
//       const link = document.createElement("a");
//       link.href = image.imageUrl;
//       link.download = `ai-image-${image.id}.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//     return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto px-4 py-6 sm:px-6">
//       <div className="max-w-7xl mx-auto pb-40">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Generate Visuals Using AI
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Transform your enhanced prompts into AI-generated images with brand styling.
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
//             Image Generation Settings
//           </h2>

//           <div className="space-y-6">
//             <Textarea
//               label="Styled Prompt"
//               placeholder="Enter your prompt..."
//               value={styledPrompt}
//               onChange={setStyledPrompt}
//               rows={4}
//             />

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <Select
//                 label="Resolution"
//                 value={resolution}
//                 onChange={setResolution}
//                 options={resolutionOptions}
//                 required
//               />
//               <Select
//                 label="Image Style"
//                 value={imageStyle}
//                 onChange={setImageStyle}
//                 options={styleOptions}
//                 placeholder="Choose a style"
//                 required
//               />
//               <Select
//                 label="Number of Images"
//                 value={numberOfImages}
//                 onChange={setNumberOfImages}
//                 options={numberOfImagesOptions}
//                 required
//               />
//             </div>

//             {brandProfile && (
//               <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4 border border-blue-100 dark:border-purple-700">
//                 <div className="flex items-center space-x-2 mb-2">
//                   {brandProfile.brandLogo && (
//                     <img
//                       src={brandProfile.brandLogo}
//                       alt="Brand logo"
//                       className="w-6 h-6 object-contain"
//                     />
//                   )}
//                   <p className="text-blue-800 dark:text-purple-200 font-medium">
//                     Brand styling applied automatically
//                   </p>
//                 </div>
//               </div>
//             )}

//             <Button
//               onClick={generateImages}
//               icon={Sparkles}
//               disabled={!styledPrompt.trim() || !imageStyle || isGenerating}
//               size="lg"
//               className="w-full sm:w-auto"
//             >
//               {isGenerating ? "Generating AI Images..." : "Generate AI Images"}
//             </Button>
//           </div>
//         </div>

//         {isGenerating && (
//           <div className="flex items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600 dark:text-gray-300">
//                 Creating your AI-generated images...
//               </p>
//             </div>
//           </div>
//         )}

//         <PreviouslyGeneratedImage imageId="f39402a0-191f-4636-a6c5-3da8b5f137ee" />

//   {/*
//         {generatedImages.length > 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//               Generated Images
//             </h2>

//             <div className="overflow-x-auto">
//               <div className="flex space-x-6 pb-4 w-max">
//                 {generatedImages.map((image) => (
//                   <div
//                     key={image.id}
//                     className="min-w-[250px] max-w-[300px] w-full group relative bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="aspect-square relative overflow-hidden">
//                      <img src={image.imageUrl} alt="Generated AI Art" classname="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

//                       {brandProfile?.brandLogo && (
//                         <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-900/90 rounded-full p-1.5 shadow-sm">
//                           <img
//                             src={brandProfile.brandLogo}
//                             alt="Logo"
//                             className="w-full h-full object-contain"
//                           />
//                         </div>
//                       )}

//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
//                         <Button
//                           onClick={() => downloadImage(image)}
//                           icon={Download}
//                           variant="outline"
//                           size="sm"
//                           className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                         <Button
//                           onClick={() => regenerateImage(image)}
//                           icon={RefreshCw}
//                           variant="outline"
//                           size="sm"
//                           className="bg-white/90 dark:bg-gray-800 text-gray-900 dark:text-white"
//                         />
//                         <Button
//                           onClick={() => removeGeneratedImage(image.id)}
//                           icon={Trash2}
//                           variant="outline"
//                           size="sm"
//                           className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
//                         />
//                       </div>
//                     </div>

//                     <div className="p-4 text-sm text-gray-700 dark:text-gray-300">
//                       <p className="line-clamp-2 mb-1">{image.prompt}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {image.createdAt.toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )} */}

//         {generatedImages.length === 0 && !isGenerating && (
//           <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
//             <Sparkles className="w-16 h-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
//               No images generated yet
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Generate your first image above.
//             </p>
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
//           <Button
//             onClick={() => setSubView("prompt")}
//             icon={ArrowLeft}
//             variant="outline"
//             className="w-full sm:w-auto"
//           >
//             Back to Prompt Enhancer
//           </Button>
//           <Button
//             onClick={() => setSubView("poster")}
//             icon={ArrowRight}
//             variant="secondary"
//             className="w-full sm:w-auto"
//           >
//             Go to Poster Gallery
//           </Button>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default AIImageGeneration;
