const ImagePreview = ({ image }) => {
  if (!image) return null;

  return (
    <div className="mt-4 text-center">
      <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Original Image</h3>
      <img
        src={image}
        alt="Uploaded"
        className="mx-auto w-40 h-auto rounded border border-gray-200 dark:border-gray-700 shadow-sm"
      />
    </div>
  );
};

export default ImagePreview;
