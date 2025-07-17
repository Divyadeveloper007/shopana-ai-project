import React, { useRef, useState } from 'react';

const TemplateEditor = ({ templateImage, onClose }) => {
  const [productName, setProductName] = useState('');
  const [weight, setWeight] = useState('');
  const [productImg, setProductImg] = useState(null);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProductImg(URL.createObjectURL(file));
  };

  const drawTemplate = () => {
    console.log("preview image");
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const bg = new Image();
    const product = new Image();

    bg.src = templateImage;
    product.src = productImg;

    bg.onload = () => {
      canvas.width = bg.width;
      canvas.height = bg.height;
      ctx.drawImage(bg, 0, 0);

      product.onload = () => {
        ctx.drawImage(product, 190, 680, 390, 300); // Replace image region
        ctx.font = 'bold 36px serif';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(productName.toUpperCase(), canvas.width / 2, 640);

        ctx.font = 'bold 24px sans-serif';
        ctx.fillText(`${weight} G | ${(weight * 0.0353).toFixed(1)} OZ`, canvas.width - 110, canvas.height - 30);
      };
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">&times;</button>
        <h2 className="text-xl font-semibold mb-4">Customize Template</h2>

        <div className="space-y-4 mb-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full border rounded p-2"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Weight (grams)"
            className="w-full border rounded p-2"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button
          onClick={drawTemplate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Preview
        </button>

        <div className="mt-6">
          <canvas ref={canvasRef} className="w-full border rounded shadow" />
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
