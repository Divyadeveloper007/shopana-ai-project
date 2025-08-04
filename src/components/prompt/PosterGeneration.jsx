import React, { useState, useRef } from 'react';
import {
  Upload, FileImage, Loader2, CheckCircle,
  AlertCircle, Sparkles, Download, Plus
} from 'lucide-react';
import { generatePoster } from '../../api/auth';

function PosterGenerator() {
  const [formData, setFormData] = useState({ prompt: '', file: null });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.file) {
      newErrors.file = 'Please upload an image file';
    } else {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = 'Please upload a PNG, JPG, or JPEG file';
      }
    }
    if (!formData.prompt.trim()) {
      newErrors.prompt = 'Poster styling instructions are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, prompt: e.target.value }));
    if (errors.prompt) setErrors(prev => ({ ...prev, prompt: '' }));
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, file }));
    if (errors.file) setErrors(prev => ({ ...prev, file: '' }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(['dragenter', 'dragover'].includes(e.type));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData.file);
      formDataToSend.append('prompt', formData.prompt);
      const data = await generatePoster(formDataToSend);
      setResult(data);
    } catch (error) {
      setErrors({ submit: 'Failed to generate poster. Please try again.' });
      setResult({
        posterUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
        headline: 'Your Marketing Poster is Ready!',
        metadata: {
          fontColor: 'white',
          fontSize: '40px',
          textPosition: 'top center',
          logoPosition: 'bottom right'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPoster = () => {
    if (!result?.posterUrl) return;
    const link = document.createElement('a');
    link.href = result.posterUrl;
    link.download = 'generated-poster.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setFormData({ prompt: '', file: null });
    setResult(null);
    setErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Generate Marketing Poster</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Upload an image and provide styling instructions to generate a poster.
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow">
            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Image *</label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 flex justify-center items-center ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : errors.file
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {formData.file ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formData.file)}
                      alt="Preview"
                      className="w-24 h-24 object-cover mx-auto rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-500 truncate">{formData.file.name}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-500" />
                    <p className="text-sm text-gray-500">PNG, JPG, JPEG only</p>
                    <label className="inline-flex items-center mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer">
                      <Plus className="w-4 h-4 mr-2" /> Add Image
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
              {errors.file && <p className="text-sm text-red-600 mt-2 flex items-center gap-2"><AlertCircle size={16} />{errors.file}</p>}
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poster Instructions *</label>
              <textarea
                value={formData.prompt}
                onChange={handleInputChange}
                rows={4}
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.prompt ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., text top center, white font, logo bottom right"
              />
              {errors.prompt && <p className="text-sm text-red-600 mt-2 flex items-center gap-2"><AlertCircle size={16} />{errors.prompt}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <FileImage />}
              {isLoading ? 'Generating Poster...' : 'Generate Poster'}
            </button>

            {errors.submit && <p className="text-sm text-red-600 flex items-center gap-2"><AlertCircle size={16} />{errors.submit}</p>}
          </form>
        ) : (
          <div className="space-y-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{result.headline}</h2>
              </div>
              <button onClick={resetForm} className="text-sm text-gray-500 hover:underline">Create New</button>
            </div>
            <img src={result.posterUrl} alt="Generated Poster" className="rounded-xl w-full shadow-md" />
            <div className="flex gap-4">
              <button
                onClick={downloadPoster}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                <Download size={18} /> Download Poster
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Sparkles size={18} /> New Poster
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PosterGenerator;



// import React, { useState, useRef } from 'react';
// import {
//   Upload, FileImage, Loader2, CheckCircle,
//   AlertCircle, Sparkles, Download, Eye,
//   Plus
// } from 'lucide-react';
// import { generatePoster } from '../../api/auth';

// function PosterGenerator() {
//   const [formData, setFormData] = useState({
//     prompt: '',
//     file: null
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [dragActive, setDragActive] = useState(false);
//   const fileInputRef = useRef(null);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.file) {
//       newErrors.file = 'Please upload an image file';
//     } else {
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       if (!allowedTypes.includes(formData.file.type)) {
//         newErrors.file = 'Please upload a PNG, JPG, or JPEG file';
//       }
//     }

//     if (!formData.prompt.trim()) {
//       newErrors.prompt = 'Poster styling instructions are required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       prompt: e.target.value
//     }));
//     if (errors.prompt) {
//       setErrors(prev => ({ ...prev, prompt: '' }));
//     }
//   };

//   const handleFileChange = (file) => {
//     setFormData(prev => ({
//       ...prev,
//       file: file
//     }));
//     if (errors.file) {
//       setErrors(prev => ({ ...prev, file: '' }));
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileChange(e.dataTransfer.files[0]);
//     }
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   setIsLoading(true);

//   try {
//     const formDataToSend = new FormData();
//     formDataToSend.append('file', formData.file);   
//     formDataToSend.append('prompt', formData.prompt); 

//     const data = await generatePoster(formDataToSend);
//     setResult(data);
//   } catch (error) {
//     setErrors({ submit: 'Failed to generate poster. Please try again.' });

//     // Optional fallback
//     setResult({
//       posterUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
//       headline: 'Your Marketing Poster is Ready!',
//       metadata: {
//         fontColor: 'white',
//         fontSize: '40px',
//         textPosition: 'top center',
//         logoPosition: 'bottom right'
//       }
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };

// const downloadPoster = () => {
//   if (!result?.posterUrl) return;

//   const link = document.createElement('a');
//   link.href = result.posterUrl;
//   link.download = 'generated-poster.png'; // or .jpg based on your backend
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };


//   const resetForm = () => {
//     setFormData({ prompt: '', file: null });
//     setResult(null);
//     setErrors({});
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
// <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 lg:pb-12 overflow-y-auto">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">
//         {/* Header */}
//         <div className="text-center mb-2">
//           {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
//             <Sparkles className="w-8 h-8 text-white" />
//           </div> */}
        
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Generate Marketing Poster</h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Transform your images into professional marketing posters with AI-powered styling and natural language instructions.
//           </p>
//         </div>

//         {!result ? (
//           // Upload Form
//           <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 {/* Upload */}
//           <div className="space-y-3">
//   <label className="block text-lg font-semibold text-gray-900">Upload Image *</label>

//   <div
//     className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
//       dragActive
//         ? 'border-blue-500 bg-blue-50'
//         : errors.file
//         ? 'border-red-300 bg-red-50'
//         : 'border-gray-300 hover:border-gray-400'
//     }`}
//     onDragEnter={handleDrag}
//     onDragLeave={handleDrag}
//     onDragOver={handleDrag}
//     onDrop={handleDrop}
//   >
//     <input
//       ref={fileInputRef}
//       type="file"
//       accept=".png,.jpg,.jpeg"
//       onChange={(e) =>
//         e.target.files?.[0] && handleFileChange(e.target.files[0])
//       }
//       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       required
//     />

//     <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
//       {formData.file ? (
//         <div className="relative group w-28 text-center">
//           <img
//             src={URL.createObjectURL(formData.file)}
//             alt="Uploaded"
//             className="h-24 w-24 object-contain border rounded-lg shadow-sm mx-auto"
//           />
//           <p className="text-xs mt-1 truncate dark:text-gray-300">
//             {formData.file.name}
//           </p>
//           <button
//             type="button"
//             onClick={() => handleFileChange(null)}
//             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
//           >
//             ✕
//           </button>
//         </div>
//       ) : (
//         <>
//           <Upload className="w-8 h-8 text-gray-500 mb-2" />
//           <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//             PNG, JPG, or JPEG files only
//           </p>
//           <label
//             htmlFor="upload-image"
//             className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer transition-colors duration-200"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add Image
//           </label>
//           <input
//             type="file"
//             id="upload-image"
//             accept=".png,.jpg,.jpeg"
//             onChange={(e) =>
//               e.target.files?.[0] && handleFileChange(e.target.files[0])
//             }
//             className="hidden"
//           />
//         </>
//       )}
//     </div>
//   </div>

//   {errors.file && (
//     <div className="flex items-center gap-2 text-red-600 text-sm">
//       <AlertCircle className="w-4 h-4" />
//       {errors.file}
//     </div>
//   )}
// </div>


//                 {/* Prompt */}
//                 <div className="space-y-3">
//                   <label className="block text-lg font-semibold text-gray-900">
//                     Poster Styling Instructions *
//                   </label>
//                   <textarea
//                     value={formData.prompt}
//                     onChange={handleInputChange}
//                     placeholder="e.g., logo bottom right text top center font size 40 white"
//                     rows={4}
//                     className={`w-full px-4 py-3 text-gray-900 border-2 rounded-xl resize-none focus:outline-none transition-all duration-200 focus:ring-4 focus:ring-blue-100 ${
//                       errors.prompt
//                         ? 'border-red-300 focus:border-red-500'
//                         : 'border-gray-200 focus:border-blue-500'
//                     }`}
//                     required
//                   />
//                   <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
//                     <p className="font-medium mb-2">Use natural language to describe poster layout:</p>
//                     <ul className="space-y-1 text-gray-500">
//                       <li>• <strong>Logo position:</strong> top left, top center, etc.</li>
//                       <li>• <strong>Text position:</strong> same options</li>
//                       <li>• <strong>Font color:</strong> white, black, etc.</li>
//                       <li>• <strong>Font size:</strong> like "font size 40"</li>
//                     </ul>
//                   </div>
//                   {errors.prompt && (
//                     <div className="flex items-center gap-2 text-red-600 text-sm">
//                       <AlertCircle className="w-4 h-4" />
//                       {errors.prompt}
//                     </div>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-[1.02]"
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center justify-center gap-3">
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Generating Poster...
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center gap-3">
//                       <FileImage className="w-5 h-5" />
//                       Generate Poster
//                     </div>
//                   )}
//                 </button>

//                 {errors.submit && (
//                   <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-lg">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.submit}
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         ) : (
//           // Result section
//           <div className="space-y-8">
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//               <div className="p-8">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                       <CheckCircle className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-900">{result.headline}</h2>
//                       <p className="text-gray-600">Your poster has been generated successfully</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={resetForm}
//                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
//                   >
//                     Generate Another
//                   </button>
//                 </div>

//                 <div className="mb-8">
//                   <div className="bg-gray-50 rounded-2xl p-6">
//                     <img
//                       src={result.posterUrl}
//                       alt="Generated Poster"
//                       className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
//                     />
//                   </div>
//                 </div>

//                 {/* {result.metadata && (
//                   <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <Eye className="w-5 h-5" />
//                       Styling Details
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {result.metadata.fontColor && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Font Color:</span>
//                           <span className="font-medium text-gray-900">{result.metadata.fontColor}</span>
//                         </div>
//                       )}
//                       {result.metadata.fontSize && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Font Size:</span>
//                           <span className="font-medium text-gray-900">{result.metadata.fontSize}</span>
//                         </div>
//                       )}
//                       {result.metadata.textPosition && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Text Position:</span>
//                           <span className="font-medium text-gray-900">{result.metadata.textPosition}</span>
//                         </div>
//                       )}
//                       {result.metadata.logoPosition && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Logo Position:</span>
//                           <span className="font-medium text-gray-900">{result.metadata.logoPosition}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )} */}

//                 <div className="flex gap-4 mt-8">
//                   <button 
//                    onClick={downloadPoster}
//                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-xl">
//                     <Download className="w-5 h-5" />
//                     Download Poster
//                   </button>
//                   <button
//                     onClick={resetForm}
//                     className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl"
//                   >
//                     <Sparkles className="w-5 h-5" />
//                     Create New Poster
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PosterGenerator;
