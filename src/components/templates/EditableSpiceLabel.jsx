import React, { useState } from "react";
import template from '../../assests/template.jpeg'

const EditableSpiceLabel  = () => {
  const [powderImage, setPowderImage] = useState(null);
  const [powderName, setPowderName] = useState("Red Chilli Powder (Special)");
  const [weight, setWeight] = useState("200 G | 7 OZ");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setPowderImage(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-[400px] h-[600px] mx-auto">
      {/* Template Background */}
      <img
        src={template} // replace this with your uploaded PNG path or from public folder
        alt="Template"
        className="w-full h-full object-contain"
      />

      {/* Powder Image Overlay */}
      {powderImage && (
        <img
          src={powderImage}
          alt="Powder"
          className="absolute w-32 h-32 rounded-full object-cover"
          style={{ top: "230px", left: "50%", transform: "translateX(-50%)" }}
        />
      )}

      {/* Powder Name Text */}
      <div
        className="absolute text-center w-full font-bold text-lg text-white"
        style={{ top: "390px" }}
      >
        {powderName}
      </div>

      {/* Weight Text */}
      <div
        className="absolute text-center w-full font-semibold text-sm text-white"
        style={{ top: "440px" }}
      >
        {weight}
      </div>

      {/* Controls */}
      <div className="mt-4 space-y-3 text-center">
        <input type="file" onChange={handleImageUpload} />
        <input
          type="text"
          value={powderName}
          onChange={(e) => setPowderName(e.target.value)}
          className="border p-1 rounded w-64"
          placeholder="Powder Name"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border p-1 rounded w-64"
          placeholder="Weight"
        />
      </div>
    </div>
  );
};

export default EditableSpiceLabel ;






