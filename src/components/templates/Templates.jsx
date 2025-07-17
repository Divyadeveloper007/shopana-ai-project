import React, { useState } from 'react';
import TemplateCard from './TemplateCard';
import templatesData from './data';
import EditForm from './EditForm';

export default function Templates() {
  const [templates, setTemplates] = useState(templatesData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [usedTemplateId, setUsedTemplateId] = useState(null);

  const updateTemplate = (id, newData) => {
    setTemplates((prev) =>
      prev.map((tpl) => (tpl.id === id ? { ...tpl, ...newData } : tpl))
    );
    setSelectedTemplate(null);
    setUsedTemplateId(id);
  };

  return (
    <div className="overflow-y-auto w-full bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="p-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Food Poster Editor</h1>

        {selectedTemplate ? (
          <EditForm
            template={selectedTemplate}
            updateTemplate={updateTemplate}
            onCancel={() => setSelectedTemplate(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onUseTemplate={() => setSelectedTemplate(template)}
                used={template.id === usedTemplateId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}



// import React, { useState, useRef, useEffect } from "react";
// import {
//   Upload,
//   Download,
//   Eye,
//   Edit3,
//   Save,
//   RefreshCw,
//   Palette,
//   Type,
//   Image as ImageIcon,
//   Check,
//   Leaf,
//   Grid,
//   List,
// } from "lucide-react";

// const Templates = () => {
//   const [selectedTemplate, setSelectedTemplate] = useState(1);
//   const [customData, setCustomData] = useState({
//     powderName: "Red Chilli Powder",
//     extraText: "Premium",
//     weight: "200 G | 7 OZ",
//     powderImage: null,
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [viewMode, setViewMode] = useState("grid");
//   const canvasRef = useRef(null);

//   const templates = [
//     {
//       id: 1,
//       name: "Royal Heritage",
//       description: "Elegant gold and red design with traditional motifs",
//       primaryColor: "#D4AF37",
//       secondaryColor: "#8B0000",
//       accentColor: "#FF6B35",
//       pattern: "paisley",
//       preview:
//         "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop",
//     },
//     {
//       id: 2,
//       name: "Temple Spice",
//       description: "Sacred temple-inspired design with intricate borders",
//       primaryColor: "#FF8C00",
//       secondaryColor: "#4B0082",
//       accentColor: "#FFD700",
//       pattern: "mandala",
//       preview:
//         "https://images.pexels.com/photos/4198017/pexels-photo-4198017.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop",
//     },
//     {
//       id: 3,
//       name: "Modern Tradition",
//       description: "Contemporary design with traditional elements",
//       primaryColor: "#228B22",
//       secondaryColor: "#FF4500",
//       accentColor: "#FFA500",
//       pattern: "geometric",
//       preview:
//         "https://images.pexels.com/photos/4198020/pexels-photo-4198020.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop",
//     },
//     {
//       id: 4,
//       name: "Spice Garden",
//       description: "Nature-inspired with botanical patterns",
//       primaryColor: "#8FBC8F",
//       secondaryColor: "#A0522D",
//       accentColor: "#DAA520",
//       pattern: "botanical",
//       preview:
//         "https://images.pexels.com/photos/4198022/pexels-photo-4198022.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop",
//     },
//     {
//       id: 5,
//       name: "Festival Colors",
//       description: "Vibrant festival-inspired design",
//       primaryColor: "#FF1493",
//       secondaryColor: "#00CED1",
//       accentColor: "#FFD700",
//       pattern: "rangoli",
//       preview:
//         "https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=400&h=533&fit=crop",
//     },
//   ];

//   // Generate canvas-based template images
//   const generateTemplateImage = (template) => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // Set canvas size (3:4 ratio for labels)
//     canvas.width = 600;
//     canvas.height = 800;

//     // Background gradient
//     const gradient = ctx.createLinearGradient(
//       0,
//       0,
//       canvas.width,
//       canvas.height
//     );
//     gradient.addColorStop(0, template.primaryColor + "40");
//     gradient.addColorStop(1, template.secondaryColor + "40");
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Header section
//     ctx.fillStyle = template.primaryColor;
//     ctx.fillRect(20, 20, canvas.width - 40, 100);

//     // SOUTHIE logo
//     ctx.fillStyle = "white";
//     ctx.font = "bold 32px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText("SOUTHIE", canvas.width / 2, 60);
//     ctx.font = "14px Arial";
//     ctx.fillText("AUTHENTIC INDIAN FOOD", canvas.width / 2, 85);

//     // Love from South India banner
//     ctx.fillStyle = template.secondaryColor;
//     ctx.fillRect(20, 120, canvas.width - 40, 40);
//     ctx.fillStyle = "white";
//     ctx.font = "16px Arial";
//     ctx.fillText("WITH LOVE, FROM SOUTH INDIA", canvas.width / 2, 145);

//     // Product image circle
//     ctx.beginPath();
//     ctx.arc(canvas.width / 2, 250, 80, 0, 2 * Math.PI);
//     ctx.strokeStyle = template.accentColor;
//     ctx.lineWidth = 6;
//     ctx.stroke();
//     ctx.fillStyle = "#f0f0f0";
//     ctx.fill();

//     // Product name
//     ctx.fillStyle = template.secondaryColor;
//     ctx.font = "bold 28px Arial";
//     ctx.fillText(customData.powderName, canvas.width / 2, 380);

//     // Extra text
//     if (customData.extraText) {
//       ctx.fillStyle = template.accentColor;
//       ctx.fillRect(canvas.width / 2 - 60, 400, 120, 30);
//       ctx.fillStyle = "white";
//       ctx.font = "16px Arial";
//       ctx.fillText(customData.extraText, canvas.width / 2, 420);
//     }

//     // Weight
//     ctx.fillStyle = template.primaryColor + "40";
//     ctx.fillRect(50, 460, canvas.width - 100, 50);
//     ctx.fillStyle = template.secondaryColor;
//     ctx.font = "bold 24px Arial";
//     ctx.fillText(customData.weight, canvas.width / 2, 490);

//     // Features
//     const features = [
//       "✓ 100% Pure & Natural",
//       "✓ Super Authentic Taste",
//       "✓ High Quality Ingredients",
//     ];
//     ctx.fillStyle = template.secondaryColor;
//     ctx.font = "16px Arial";
//     ctx.textAlign = "left";
//     features.forEach((feature, index) => {
//       ctx.fillText(feature, 60, 550 + index * 30);
//     });

//     // Veg symbol
//     ctx.strokeStyle = template.primaryColor;
//     ctx.lineWidth = 3;
//     ctx.strokeRect(canvas.width / 2 - 20, 680, 40, 40);
//     ctx.fillStyle = template.primaryColor;
//     ctx.font = "20px Arial";
//     ctx.textAlign = "center";
//     ctx.fillText("🌿", canvas.width / 2, 705);

//     // Bottom decorative border
//     const bottomGradient = ctx.createLinearGradient(0, 750, canvas.width, 750);
//     bottomGradient.addColorStop(0, template.primaryColor);
//     bottomGradient.addColorStop(0.5, template.accentColor);
//     bottomGradient.addColorStop(1, template.secondaryColor);
//     ctx.fillStyle = bottomGradient;
//     ctx.fillRect(20, 750, canvas.width - 40, 30);

//     return canvas.toDataURL("image/png");
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCustomData((prev) => ({ ...prev, powderImage: e.target.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setCustomData((prev) => ({ ...prev, [field]: value }));
//   };

//   const downloadTemplate = () => {
//     const selectedTemplateData = templates.find(
//       (t) => t.id === selectedTemplate
//     );
//     const imageData = generateTemplateImage(selectedTemplateData);

//     // Create download link
//     const link = document.createElement("a");
//     link.download = `southie-${selectedTemplateData.name
//       .toLowerCase()
//       .replace(" ", "-")}-label.png`;
//     link.href = imageData;
//     link.click();
//   };

//   const previewFullSize = () => {
//     const selectedTemplateData = templates.find(
//       (t) => t.id === selectedTemplate
//     );
//     const imageData = generateTemplateImage(selectedTemplateData);

//     // Open in new window
//     const newWindow = window.open();
//     newWindow.document.write(`
//       <html>
//         <head><title>Label Preview - ${selectedTemplateData.name}</title></head>
//         <body style="margin:0; padding:20px; background:#f0f0f0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
//           <img src="${imageData}" style="max-width:100%; max-height:100%; box-shadow:0 10px 30px rgba(0,0,0,0.3);" />
//         </body>
//       </html>
//     `);
//   };

//   const renderPattern = (patternType, color) => {
//     const patterns = {
//       paisley: (
//         <svg
//           className="absolute inset-0 w-full h-full opacity-10"
//           viewBox="0 0 100 100"
//         >
//           <defs>
//             <pattern
//               id={`paisley-${selectedTemplate}`}
//               x="0"
//               y="0"
//               width="20"
//               height="20"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M10,2 C15,2 18,8 18,12 C18,16 15,18 10,18 C8,18 6,16 6,12 C6,8 8,2 10,2 Z"
//                 fill={color}
//               />
//             </pattern>
//           </defs>
//           <rect
//             width="100"
//             height="100"
//             fill={`url(#paisley-${selectedTemplate})`}
//           />
//         </svg>
//       ),
//       mandala: (
//         <svg
//           className="absolute inset-0 w-full h-full opacity-10"
//           viewBox="0 0 100 100"
//         >
//           <defs>
//             <pattern
//               id={`mandala-${selectedTemplate}`}
//               x="0"
//               y="0"
//               width="25"
//               height="25"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle
//                 cx="12.5"
//                 cy="12.5"
//                 r="8"
//                 fill="none"
//                 stroke={color}
//                 strokeWidth="0.5"
//               />
//               <circle
//                 cx="12.5"
//                 cy="12.5"
//                 r="4"
//                 fill="none"
//                 stroke={color}
//                 strokeWidth="0.5"
//               />
//               <circle cx="12.5" cy="12.5" r="2" fill={color} />
//             </pattern>
//           </defs>
//           <rect
//             width="100"
//             height="100"
//             fill={`url(#mandala-${selectedTemplate})`}
//           />
//         </svg>
//       ),
//       geometric: (
//         <svg
//           className="absolute inset-0 w-full h-full opacity-10"
//           viewBox="0 0 100 100"
//         >
//           <defs>
//             <pattern
//               id={`geometric-${selectedTemplate}`}
//               x="0"
//               y="0"
//               width="15"
//               height="15"
//               patternUnits="userSpaceOnUse"
//             >
//               <polygon points="7.5,0 15,7.5 7.5,15 0,7.5" fill={color} />
//             </pattern>
//           </defs>
//           <rect
//             width="100"
//             height="100"
//             fill={`url(#geometric-${selectedTemplate})`}
//           />
//         </svg>
//       ),
//       botanical: (
//         <svg
//           className="absolute inset-0 w-full h-full opacity-10"
//           viewBox="0 0 100 100"
//         >
//           <defs>
//             <pattern
//               id={`botanical-${selectedTemplate}`}
//               x="0"
//               y="0"
//               width="20"
//               height="20"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M10,2 L12,8 L18,10 L12,12 L10,18 L8,12 L2,10 L8,8 Z"
//                 fill={color}
//               />
//             </pattern>
//           </defs>
//           <rect
//             width="100"
//             height="100"
//             fill={`url(#botanical-${selectedTemplate})`}
//           />
//         </svg>
//       ),
//       rangoli: (
//         <svg
//           className="absolute inset-0 w-full h-full opacity-10"
//           viewBox="0 0 100 100"
//         >
//           <defs>
//             <pattern
//               id={`rangoli-${selectedTemplate}`}
//               x="0"
//               y="0"
//               width="30"
//               height="30"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle
//                 cx="15"
//                 cy="15"
//                 r="6"
//                 fill="none"
//                 stroke={color}
//                 strokeWidth="1"
//               />
//               <circle cx="15" cy="15" r="3" fill={color} />
//               <path
//                 d="M15,9 L21,15 L15,21 L9,15 Z"
//                 fill="none"
//                 stroke={color}
//                 strokeWidth="0.5"
//               />
//             </pattern>
//           </defs>
//           <rect
//             width="100"
//             height="100"
//             fill={`url(#rangoli-${selectedTemplate})`}
//           />
//         </svg>
//       ),
//     };
//     return patterns[patternType] || patterns.paisley;
//   };

//   const renderTemplate = (template, mode = "gallery") => {
//     const defaultImage =
//       "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg?auto=compress&cs=tinysrgb&w=300";
//     const isGallery = mode === "gallery";

//     return (
//       <div
//         className="relative w-full aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg border-2"
//         style={{
//           background: `linear-gradient(135deg, ${template.primaryColor}20, ${template.secondaryColor}20)`,
//           borderColor: template.primaryColor,
//         }}
//       >
//         {/* Background Pattern */}
//         {renderPattern(template.pattern, template.primaryColor)}

//         {/* Decorative Border */}
//         <div
//           className="absolute inset-2 border-2 rounded-lg"
//           style={{ borderColor: template.accentColor }}
//         >
//           {/* Header Section */}
//           <div
//             className="relative h-16 flex items-center justify-center"
//             style={{ backgroundColor: template.primaryColor }}
//           >
//             <div className="text-center">
//               <div className="text-white font-bold text-lg tracking-wider">
//                 SOUTHIE
//               </div>
//               <div className="text-white text-xs opacity-90">
//                 AUTHENTIC INDIAN FOOD
//               </div>
//             </div>
//           </div>

//           {/* Love from South India */}
//           <div
//             className="py-2 text-center text-xs font-medium tracking-wide"
//             style={{
//               backgroundColor: template.secondaryColor,
//               color: "white",
//             }}
//           >
//             WITH LOVE, FROM SOUTH INDIA
//           </div>

//           {/* Main Content Area */}
//           <div className="p-2 flex-1 flex flex-col">
//             {/* Product Image */}
//             <div className="flex justify-center mb-4">
//               <div
//                 className={`rounded-full overflow-hidden border-4 shadow-lg flex items-center justify-center ${
//                   isGallery ? "w-24 h-24" : "w-32 h-32"
//                 }`}
//               >
//                 <img
//                   src={customData.powderImage || defaultImage}
//                   className={`object-cover ${
//                     isGallery ? "scale-100" : "scale-125"
//                   } w-full h-full`}
//                   alt="Spice powder"
//                 />
//               </div>
//             </div>

//             {/* Product Name */}
//             <div className="text-center mb-4">
//               <h2
//                 className="text-xl font-bold mb-1"
//                 style={{ color: template.secondaryColor }}
//               >
//                 {customData.powderName}
//               </h2>
//               {customData.extraText && (
//                 <div
//                   className="text-sm font-medium px-2 py-1 rounded-full inline-block"
//                   style={{
//                     backgroundColor: template.accentColor,
//                     color: "white",
//                   }}
//                 >
//                   {customData.extraText}
//                 </div>
//               )}
//             </div>

//             {/* Weight */}
//             <div
//               className="text-center py-2 mb-4 rounded-lg font-bold text-lg"
//               style={{
//                 backgroundColor: template.primaryColor + "20",
//                 color: template.secondaryColor,
//               }}
//             >
//               {customData.weight}
//             </div>

//             {/* Features */}
//             <div className="space-y-2 text-xs">
//               {[
//                 "100% Pure & Natural",
//                 "Super Authentic Taste",
//                 "High Quality Ingredients",
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-center">
//                   <Check
//                     className="w-3 h-3 mr-2 flex-shrink-0"
//                     style={{ color: template.primaryColor }}
//                   />
//                   <span style={{ color: template.secondaryColor }}>
//                     {feature}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* Veg Icon */}
//             <div className="flex justify-center mt-4">
//               <div
//                 className="w-8 h-8 border-2 rounded flex items-center justify-center"
//                 style={{ borderColor: template.primaryColor }}
//               >
//                 <Leaf
//                   className="w-4 h-4"
//                   style={{ color: template.primaryColor }}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bottom Decorative Border */}
//           <div
//             className="h-2"
//             style={{
//               background: `linear-gradient(90deg, ${template.primaryColor}, ${template.accentColor}, ${template.secondaryColor})`,
//             }}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex-1 overflow-y-auto bg-gray-50">
//       <div className="p-4 sm:p-6 lg:p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Spice Label Templates
//           </h1>
//           <p className="text-gray-600">
//             Create professional South Indian spice labels with customizable
//             templates
//           </p>
//         </div>

//         {/* Template Gallery */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-semibold text-gray-900">
//               Template Gallery
//             </h2>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-lg transition-colors duration-200 ${
//                   viewMode === "grid"
//                     ? "bg-purple-100 text-purple-600"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 <Grid className="w-5 h-5" />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-lg transition-colors duration-200 ${
//                   viewMode === "list"
//                     ? "bg-purple-100 text-purple-600"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 <List className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Template Grid */}
//           <div
//             className={`grid gap-6 ${
//               viewMode === "grid"
//                 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
//                 : "grid-cols-1"
//             }`}
//           >
//             {templates.map((template) => (
//               <div
//                 key={template.id}
//                 className={`bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer ${
//                   selectedTemplate === template.id
//                     ? "border-purple-500 ring-2 ring-purple-200"
//                     : "border-gray-200 hover:border-gray-300"
//                 }`}
//                 onClick={() => setSelectedTemplate(template.id)}
//               >
//                 {/* Template Preview Image */}
//                 <div className="relative aspect-[3/4] overflow-hidden">
//                   <div className="w-full h-full">
//                     {renderTemplate(template)}
//                   </div>
//                   {selectedTemplate === template.id && (
//                     <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
//                       <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//                         Selected
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Template Info */}
//                 <div className="p-4">
//                   <div className="flex items-center mb-2">
//                     <div
//                       className="w-4 h-4 rounded-full mr-3"
//                       style={{ backgroundColor: template.primaryColor }}
//                     />
//                     <h3 className="font-semibold text-gray-900">
//                       {template.name}
//                     </h3>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {template.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex space-x-1">
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: template.primaryColor }}
//                       />
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: template.secondaryColor }}
//                       />
//                       <div
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: template.accentColor }}
//                       />
//                     </div>
//                     <span className="text-xs text-gray-500 capitalize">
//                       {template.pattern}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Customization Panel */}
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   Customize Label
//                 </h2>
//                 <button
//                   onClick={() => setEditMode(!editMode)}
//                   className={`p-2 rounded-lg transition-colors duration-200 ${
//                     editMode
//                       ? "bg-purple-100 text-purple-600"
//                       : "bg-gray-100 text-gray-600"
//                   }`}
//                 >
//                   <Edit3 className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Powder Image
//                   </label>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors duration-200">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="powder-image"
//                     />
//                     <label htmlFor="powder-image" className="cursor-pointer">
//                       {customData.powderImage ? (
//                         <img
//                           src={customData.powderImage}
//                           alt="Uploaded"
//                           className="w-16 h-16 object-cover rounded-full mx-auto mb-2"
//                         />
//                       ) : (
//                         <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       )}
//                       <p className="text-sm text-gray-600">
//                         {customData.powderImage
//                           ? "Change image"
//                           : "Upload powder image"}
//                       </p>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Powder Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Powder Name
//                   </label>
//                   <input
//                     type="text"
//                     value={customData.powderName}
//                     onChange={(e) =>
//                       handleInputChange("powderName", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="e.g., Red Chilli Powder"
//                   />
//                 </div>

//                 {/* Extra Text */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Extra Text (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     value={customData.extraText}
//                     onChange={(e) =>
//                       handleInputChange("extraText", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     placeholder="e.g., Premium, Special, Fine"
//                   />
//                 </div>

//                 {/* Weight */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Weight
//                   </label>
//                   <select
//                     value={customData.weight}
//                     onChange={(e) =>
//                       handleInputChange("weight", e.target.value)
//                     }
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   >
//                     <option value="100 G | 3.5 OZ">100 G | 3.5 OZ</option>
//                     <option value="200 G | 7 OZ">200 G | 7 OZ</option>
//                     <option value="500 G | 17.6 OZ">500 G | 17.6 OZ</option>
//                     <option value="1 KG | 35.3 OZ">1 KG | 35.3 OZ</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-6 space-y-3">
//                 <button
//                   onClick={downloadTemplate}
//                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
//                 >
//                   <Download className="w-5 h-5 mr-2" />
//                   Download Label (300 DPI)
//                 </button>

//                 <button
//                   onClick={previewFullSize}
//                   className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
//                 >
//                   <Eye className="w-5 h-5 mr-2" />
//                   Preview Full Size
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Live Preview */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   Live Preview:{" "}
//                   {templates.find((t) => t.id === selectedTemplate)?.name}
//                 </h2>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => setCustomData((prev) => ({ ...prev }))}
//                     className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//                   >
//                     <RefreshCw className="w-5 h-5" />
//                   </button>
//                   <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                     <Palette className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Template Preview */}
//               <div className="flex justify-center mb-6">
//                 <div className="w-full max-w-md">
//                   {renderTemplate(
//                     templates.find((t) => t.id === selectedTemplate),
//                     "preview"
//                   )}
//                 </div>
//               </div>

//               {/* Template Info */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-medium text-gray-900 mb-2">
//                     Template Specifications
//                   </h3>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex justify-between">
//                       <span>Resolution:</span>
//                       <span className="font-medium">300 DPI</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Format:</span>
//                       <span className="font-medium">Print Ready PNG</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Size:</span>
//                       <span className="font-medium">3:4 Aspect Ratio</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Colors:</span>
//                       <span className="font-medium">CMYK Compatible</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h3 className="font-medium text-gray-900 mb-2">
//                     Current Settings
//                   </h3>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div className="flex justify-between">
//                       <span>Product:</span>
//                       <span className="font-medium">
//                         {customData.powderName}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Extra Text:</span>
//                       <span className="font-medium">
//                         {customData.extraText || "None"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Weight:</span>
//                       <span className="font-medium">{customData.weight}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span>Image:</span>
//                       <span className="font-medium">
//                         {customData.powderImage ? "Custom" : "Default"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hidden canvas for image generation */}
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default Templates;



// import React, { useState } from 'react';
// import {
//   Search,
//   Filter,
//   Star,
//   Download,
//   Eye,
//   Sparkles,
//   Calendar,
//   ShoppingBag,
//   Mail,
//   Instagram,
//   Facebook,
//   Globe
// } from 'lucide-react';
// import TemplateEditor from './TemplateEditor';

// const Templates = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedPlatform, setSelectedPlatform] = useState('all');
//   const [selectedTemplateImg, setSelectedTemplateImg] = useState(null);

//   const categories = [
//     { id: 'all', label: 'All Templates', icon: Sparkles },
//     { id: 'promotion', label: 'Promotions', icon: ShoppingBag },
//     { id: 'seasonal', label: 'Seasonal', icon: Calendar },
//     { id: 'social', label: 'Social Media', icon: Instagram },
//     { id: 'email', label: 'Email Marketing', icon: Mail },
//     { id: 'web', label: 'Web Banners', icon: Globe }
//   ];

//   const platforms = [
//     { id: 'all', label: 'All Platforms' },
//     { id: 'instagram', label: 'Instagram' },
//     { id: 'facebook', label: 'Facebook' },
//     { id: 'email', label: 'Email' },
//     { id: 'web', label: 'Website' }
//   ];

//   const templates = [
//     {
//       id: 1,
//       name: 'Holiday Sale Banner',
//       category: 'promotion',
//       platform: 'web',
//       size: '1920x600',
//       downloads: 1247,
//       rating: 4.8,
//       premium: false,
//       preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'Perfect for holiday promotions and seasonal sales'
//     },
//     {
//       id: 2,
//       name: 'Instagram Story Template',
//       category: 'social',
//       platform: 'instagram',
//       size: '1080x1920',
//       downloads: 892,
//       rating: 4.9,
//       premium: true,
//       preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'Engaging story template for product showcases'
//     },
//     {
//       id: 3,
//       name: 'Email Newsletter Header',
//       category: 'email',
//       platform: 'email',
//       size: '600x300',
//       downloads: 634,
//       rating: 4.7,
//       premium: false,
//       preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'Professional header for email campaigns'
//     },
//     {
//       id: 4,
//       name: 'Spring Collection Promo',
//       category: 'seasonal',
//       platform: 'facebook',
//       size: '1200x630',
//       downloads: 756,
//       rating: 4.6,
//       premium: true,
//       preview: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'Fresh spring-themed promotional template'
//     },
//     {
//       id: 5,
//       name: 'Product Launch Announcement',
//       category: 'promotion',
//       platform: 'instagram',
//       size: '1080x1080',
//       downloads: 923,
//       rating: 4.8,
//       premium: false,
//       preview: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'Bold template for new product announcements'
//     },
//     {
//       id: 6,
//       name: 'Black Friday Sale',
//       category: 'promotion',
//       platform: 'web',
//       size: '1920x800',
//       downloads: 1456,
//       rating: 4.9,
//       premium: true,
//       preview: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
//       description: 'High-impact Black Friday promotional banner'
//     }
//   ];

//   const filteredTemplates = templates.filter(template => {
//     const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
//     const matchesPlatform = selectedPlatform === 'all' || template.platform === selectedPlatform;
//     return matchesSearch && matchesCategory && matchesPlatform;
//   });

// const useTemplate = (template) => {
//   // Replace with your local template image if needed
//   setSelectedTemplateImg("/702be28e-49c9-4267-8686-54dac06dee78.png");
// };

//   return (
//     <div className="flex-1 overflow-y-auto bg-gray-50">
//       <div className="p-4 sm:p-6 lg:p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//             Templates
//           </h1>
//           <p className="text-gray-600">
//             Professional templates tailored for different business needs and platforms
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
//             {/* Search */}
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search templates..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//             </div>

//             {/* Filters */}
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 {categories.map(category => (
//                   <option key={category.id} value={category.id}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedPlatform}
//                 onChange={(e) => setSelectedPlatform(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               >
//                 {platforms.map(platform => (
//                   <option key={platform.id} value={platform.id}>
//                     {platform.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-6">
//           {/* Categories Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
//               <div className="space-y-2">
//                 {categories.map((category) => {
//                   const Icon = category.icon;
//                   const count = category.id === 'all'
//                     ? templates.length
//                     : templates.filter(t => t.category === category.id).length;

//                   return (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
//                         selectedCategory === category.id
//                           ? 'bg-purple-50 text-purple-700 border border-purple-200'
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <Icon className="w-5 h-5 mr-3" />
//                         <span className="font-medium">{category.label}</span>
//                       </div>
//                       <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                         {count}
//                       </span>
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* Popular Tags */}
//               <div className="mt-8">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Tags</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {['sale', 'modern', 'minimal', 'colorful', 'professional'].map((tag) => (
//                     <button
//                       key={tag}
//                       className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200"
//                     >
//                       {tag}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Templates Grid */}
//           <div className="lg:col-span-3">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {filteredTemplates.map((template) => (
//                 <div
//                   key={template.id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group"
//                 >
//                   <div className="relative">
//                     <img
//                       src={template.preview}
//                       alt={template.name}
//                       className="w-full h-48 object-cover"
//                     />
//                     {template.premium && (
//                       <div className="absolute top-3 left-3">
//                         <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full">
//                           Premium
//                         </span>
//                       </div>
//                     )}
//                     <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                       <button className="p-2 bg-white/90 text-gray-600 rounded-full hover:bg-white transition-colors duration-200">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                     </div>
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
//                       <button
//                         onClick={() => useTemplate(template)}
//                         className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200"
//                       >
//                         Use Template
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-4">
//                     <div className="flex items-start justify-between mb-2">
//                       <h3 className="font-medium text-gray-900 truncate flex-1 mr-2">
//                         {template.name}
//                       </h3>
//                       <div className="flex items-center space-x-1 text-yellow-500">
//                         <Star className="w-4 h-4 fill-current" />
//                         <span className="text-sm text-gray-600">{template.rating}</span>
//                       </div>
//                     </div>

//                     <p className="text-sm text-gray-600 mb-3 line-clamp-2">
//                       {template.description}
//                     </p>

//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                       <span>{template.size}</span>
//                       <div className="flex items-center space-x-1">
//                         <Download className="w-4 h-4" />
//                         <span>{template.downloads.toLocaleString()}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
//                         {template.platform}
//                       </span>
//                       <button
//                         onClick={() => useTemplate(template)}
//                         className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
//                       >
//                         Use Template
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {filteredTemplates.length === 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
//                 <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search terms or filters
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {selectedTemplateImg && (
//   <TemplateEditor
//     templateImage={selectedTemplateImg}
//     onClose={() => setSelectedTemplateImg(null)}
//   />
// )}
//     </div>
//   );
// };

// export default Templates;
