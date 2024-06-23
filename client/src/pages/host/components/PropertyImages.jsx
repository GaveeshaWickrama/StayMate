import React from 'react';

const PropertyImages = ({ property, handleChange, setProperty }) => {
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const newImages = property.images.map((img, imgIndex) => {
      if (imgIndex !== index) return img;
      return { ...img, url, file };
    });
    setProperty(prevState => ({
      ...prevState,
      images: newImages
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Property Images</h2>
      {property.images.map((image, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">Image URL:</label>
          <input
            type="text"
            name={`image_${index}`}
            value={image.url}
            onChange={(e) => {
              const newImages = property.images.map((img, imgIndex) => {
                if (imgIndex !== index) return img;
                return { ...img, url: e.target.value };
              });
              setProperty(prevState => ({
                ...prevState,
                images: newImages
              }));
            }}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            name={`file_${index}`}
            onChange={(e) => handleFileChange(e, index)}
            className="block w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setProperty(prevState => ({
          ...prevState,
          images: [...prevState.images, { url: '', file: null }]
        }))}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add More Images
      </button>
    </div>
  );
};

export default PropertyImages;

