import { ImageIcon, Download } from 'lucide-react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

export default function TemplateCard({ template, onUseTemplate, used }) {
  const cardRef = useRef();

  const backgroundImage = template.customData?.backgroundImage || template.backgroundImage;
  const imageUrl = template.customData?.imageUrl || template.imageUrl;
  const title = template.customData?.title || template.title;
  const description = template.customData?.description || template.description;

  const isImagePresent = imageUrl && imageUrl.trim() !== '';

  const handleUseTemplate = () => {
    onUseTemplate();
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 2, // for higher resolution
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = title ? `${title}.png` : 'template.png';
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div
      className="relative group rounded-2xl shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.03] duration-300"
    >
      <div
        ref={cardRef}
        className="p-6 h-96 bg-cover bg-center flex flex-col justify-between border border-gray-200 dark:border-gray-700 rounded-2xl"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex justify-center items-center h-56">
          {isImagePresent ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-56 h-56 object-cover rounded-xl shadow-md"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center  rounded-md border border-dashed">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        <div className="text-center mt-4 bg-black/60 dark:bg-white/10 p-3 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-white dark:text-white drop-shadow">{title}</h2>
          <p className="text-sm text-gray-200 dark:text-gray-300">{description}</p>
        </div>
      </div>

      {/* Overlay */}
     <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out bg-transparent md:bg-black/40 md:dark:bg-black/50 md:hidden group-hover:flex">
  {!used ? (
    <button
      onClick={handleUseTemplate}
      className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
    >
      Use Template
    </button>
  ) : (
    <button
      onClick={handleDownload}
      className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200 flex items-center gap-2"
    >
      <Download className="w-5 h-5" />
      Download
    </button>
  )}
</div>

    </div>
  );
}
