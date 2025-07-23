
import { useState } from "react";
import PromptOutput from "./PromptOutput";
import InputField from "./InputField";
import GeneratedGallery from "../posts/GeneratedGallery";

const MessageArea = () => {
  const [currentView, setCurrentView] = useState("chat");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewChange = (view, image = null) => {
    setCurrentView(view);
    setSelectedImage(image);
  };

  return (
    <div className="relative h-full flex flex-col bg-white dark:bg-gray-900">
      {currentView === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto">
            <PromptOutput setCurrentView={handleViewChange} />
          </div>
          <div className="sticky bottom-0 z-10 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <InputField />
          </div>
        </>
      )}

      {currentView === "gallery" && (
        <GeneratedGallery setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default MessageArea;
