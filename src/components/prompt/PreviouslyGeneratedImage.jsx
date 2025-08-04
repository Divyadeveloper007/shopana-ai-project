import React, { useEffect, useState } from "react";
import { getImageUrlById } from "../../api/auth"; // previously created

const PreviouslyGeneratedImage = ({ imageId }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (imageId) {
      const url = getImageUrlById(imageId);
      setImageUrl(url);
    }
  }, [imageId]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border mb-8 border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Generated Image</h2>

      {imageUrl ? (
       <img src={imageUrl} alt=" Generated image" classname="rounded-md border border-gray-300 dark:border-gray-600 w-64 h-auto mx-auto" />
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No image available</p>
      )}
    </div>
  );
};

export default PreviouslyGeneratedImage;
