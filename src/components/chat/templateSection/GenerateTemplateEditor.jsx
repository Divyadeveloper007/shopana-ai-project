import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import templates from "./Templates";
import ImagePreview from "./ImagePreview";
import TemplateSelector from "./TemplateSelector";
import FinalImagePreview from "./FinalImagePreview";
import { removeBackgroundBase64 } from "../../../api/auth";

// 🔧 Utility: Convert base64 to File
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

const GenerateTemplateEditor = ({ image, onBack, setCurrentView }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [transparentImage, setTransparentImage] = useState(null);
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("state:",finalImageUrl)

useEffect(() => {
  const autoRemoveBackground = async () => {
    if (image && selectedTemplate && !transparentImage) {
      try {
        setLoading(true);
        const base64 = image.split(",")[1]; // remove data:image/... base64 prefix
        const removed = await removeBackgroundBase64(base64);
        setTransparentImage(removed);
        composeImage(selectedTemplate, removed);
      } catch (error) {
        console.error("Error during background removal:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  autoRemoveBackground();
}, [image, selectedTemplate]);

useEffect(() => {
  if (selectedTemplate && transparentImage) {
    composeImage(selectedTemplate, transparentImage);
  }
}, [selectedTemplate, transparentImage]);


 const handleTemplateSelect = (template) => {
  setSelectedTemplate(template);
  setFinalImageUrl(null); // clear previous
  setTransparentImage(null); // reset for new processing
};

 const composeImage = (templateUrl, personUrl) => {
  console.log("selected template:",templateUrl)
  console.log("background removed image:",personUrl )
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const bg = new Image();
  const fg = new Image();

  bg.crossOrigin = "anonymous";
  fg.crossOrigin = "anonymous";

  bg.src = templateUrl;
  fg.src = personUrl;

  bg.onload = () => {
    fg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;

      ctx.drawImage(bg, 0, 0);

    // 🔁 Fill 80% of canvas size
const scale = 0.95;
const imgWidth = canvas.width * scale;
const imgHeight = canvas.height * scale;
const x = (canvas.width - imgWidth) / 2;
const y = (canvas.height - imgHeight) / 2;

ctx.drawImage(fg, x, y, imgWidth, imgHeight);


      const final = canvas.toDataURL("image/png");
      setFinalImageUrl(final);
      console.log("🎨 Final composed image ready.");
    };

    fg.onerror = () => {
      console.error("❌ Foreground image failed to load", personUrl);
    };
  };

  bg.onerror = () => {
    console.error("❌ Background image failed to load", templateUrl);
  };
};


  return (
    <div className="p-4 max-w-screen-xl mx-auto overflow-y-auto">
      <button
        onClick={() => setCurrentView("chat")}
        className="mb-4 flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-500"
      >
        <ArrowLeft className="mr-1" size={18} />
        Back
      </button>

      <h2 className="text-xl font-semibold mb-2">Original Image</h2>
      {image && <ImagePreview image={image} />}

      {loading && <p className="text-sm text-gray-500 mt-2">Processing...</p>}

     {!loading && (
  <>
    <h2 className="text-xl font-semibold mb-2 mt-4">Choose a Template</h2>
    <TemplateSelector
      templates={templates}
      selectedTemplate={selectedTemplate}
      onSelect={handleTemplateSelect}
    />
  </>
)}

<FinalImagePreview imageUrl={finalImageUrl} />
    </div>
  );
};

export default GenerateTemplateEditor;


// import React, { useState } from "react";
// import axios from "axios";

// const GenerateTemplateEditor = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [resultImage, setResultImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//     setResultImage(null);
//   };

//   const removeBackground = async () => {
//     if (!selectedFile) {
//       alert("Please upload an image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image_file", selectedFile);

//     setLoading(true);
   
//     try {
//       const response = await axios.post("https://api.pixian.ai/remove-background", formData, {
//         headers: {
//           Accept: "image/png",
//         },
//         responseType: "blob",
//       });

//       const imageUrl = URL.createObjectURL(response.data);
//       setResultImage(imageUrl);
//     } catch (error) {
//       console.error("❌ Pixian API error:", error);
//       alert("Failed to remove background. Try a different image.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto text-center">
//       <h2 className="text-2xl font-bold mb-4">Pixian Background Remover</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="mb-4"
//       />

//       <button
//         onClick={removeBackground}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Remove Background"}
//       </button>

//       {resultImage && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2">Result:</h3>
//           <img
//             src={resultImage}
//             alt="Transparent"
//             className="max-w-full border rounded"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateTemplateEditor;
