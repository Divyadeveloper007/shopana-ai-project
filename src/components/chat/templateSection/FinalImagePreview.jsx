import { Download } from "lucide-react";

const FinalImagePreview = ({ imageUrl }) => {
  console.log("jkkkkkkkkkkkkkkh")
  console.log(imageUrl)
  if (!imageUrl) return null;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "poster.png";
    a.click();
  };

  return (
    <div className="text-center mt-6">
      <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Final Image</h3>
      <img
        src={imageUrl}
        alt="Final Output"
        className="rounded shadow-md w-1/3 object-contain mx-auto"
      />
      <button
        onClick={handleDownload}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center"
      >
        <Download className="mr-1" size={18} />
        Download
      </button>
    </div>
  );
};

export default FinalImagePreview;
