import React, { useState } from 'react';

export default function EditForm({ template, updateTemplate, onCancel }) {
  const [formData, setFormData] = useState({
    title: template.customData?.title || template.title,
    description: template.customData?.description || template.description,
    bgColor: template.customData?.bgColor || '#FDE68A',
    imageUrl: template.customData?.imageUrl || template.imageUrl,
    backgroundImage: template.customData?.backgroundImage || template.backgroundImage,
    apiKey: 'fBUBqBYNx6vx8qasaKsNMwEA',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !formData.apiKey) {
      alert("Please upload an image and provide your remove.bg API key.");
      return;
    }

    const data = new FormData();
    data.append('image_file', file);
    data.append('size', 'auto');

    try {
      const res = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': formData.apiKey,
        },
        body: data,
      });

      if (!res.ok) {
        alert("Background removal failed. Invalid API key or image.");
        return;
      }

      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }

    e.target.value = null;
  };

  const handleSubmit = () => {
    updateTemplate(template.id, {
      customData: { ...formData },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded shadow-md max-w-xl mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4">Customize Template</h2>

      <input
        type="text"
        name="apiKey"
        placeholder="Enter your remove.bg API Key"
        value={formData.apiKey}
        onChange={handleChange}
        className="w-full mb-3 p-2 border border-blue-400 rounded bg-white dark:bg-gray-800 dark:border-blue-500 dark:text-white"
      />

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white"
      ></textarea>

      <input
        type="color"
        name="bgColor"
        value={formData.bgColor}
        onChange={handleChange}
        className="w-full mb-3"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-3 text-gray-700 dark:text-gray-300"
      />

      <input
        type="text"
        name="backgroundImage"
        value={formData.backgroundImage || ''}
        onChange={handleChange}
        placeholder="Background Image URL"
        className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 dark:text-white"
      />

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Apply
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 px-4 py-2 rounded text-black dark:text-white transition"
        >
          Cancel
        </button>
      </div>

      <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
        <h3 className="text-xl font-bold mb-2">Preview</h3>
        <div
          className="p-4 rounded bg-cover bg-center"
          style={{ backgroundImage: `url(${formData.backgroundImage})`, backgroundColor: formData.bgColor }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded shadow"
            />
          </div>
          <h2 className="text-xl font-bold text-center mb-2 text-white drop-shadow">
            {formData.title}
          </h2>
          <p className="text-center text-white drop-shadow">{formData.description}</p>
        </div>
      </div>
    </div>
  );
}


// before background remover:

// import React, { useState } from 'react';

// export default function EditForm({ template, updateTemplate, onCancel }) {
//   const [formData, setFormData] = useState({
//     title: template.customData?.title || template.title,
//     description: template.customData?.description || template.description,
//     bgColor: template.customData?.bgColor || '#FDE68A',
//     imageUrl: template.customData?.imageUrl || template.imageUrl,
//     backgroundImage: template.customData?.backgroundImage || template.backgroundImage,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//     updateTemplate(template.id, {
//       customData: { ...formData },
//     });
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Customize Template</h2>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Title"
//         className="w-full mb-3 p-2 border rounded"
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Description"
//         className="w-full mb-3 p-2 border rounded"
//       ></textarea>
//       <input
//         type="color"
//         name="bgColor"
//         value={formData.bgColor}
//         onChange={handleChange}
//         className="w-full mb-3"
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="w-full mb-3"
//       />
//       <input
//         type="text"
//         name="backgroundImage"
//         value={formData.backgroundImage || ''}
//         onChange={handleChange}
//         placeholder="Background Image URL"
//         className="w-full mb-3 p-2 border rounded"
//       />
//       <div className="flex justify-between">
//         <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">
//           Apply
//         </button>
//         <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
//           Cancel
//         </button>
//       </div>
//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-xl font-bold mb-2">Preview</h3>
//         <div
//           className="p-4 rounded bg-cover bg-center"
//           style={{ backgroundImage: `url(${formData.backgroundImage})` }}
//         >
//           <div className="flex justify-center mb-4">
//             <img
//               src={formData.imageUrl}
//               alt="Preview"
//               className="w-32 h-32 object-cover "
//             />
//           </div>
//           <h2 className="text-xl font-bold text-center mb-2 text-white drop-shadow">
//             {formData.title}
//           </h2>
//           <p className="text-center text-white drop-shadow">{formData.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }