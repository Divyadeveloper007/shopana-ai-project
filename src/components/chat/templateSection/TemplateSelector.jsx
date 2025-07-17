const TemplateSelector = ({ templates, selectedTemplate, onSelect }) => {
  return (
    <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {templates.map((temp, idx) => (
        <img
          key={idx}
          src={temp}
          onClick={() => onSelect(temp)}
          className={`w-full h-28 object-cover rounded cursor-pointer transition duration-300 ${
            selectedTemplate === temp ? "ring-2 ring-blue-500" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default TemplateSelector;
