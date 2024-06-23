import React from 'react';

const PropertyImages = ({ property, handleChange, setProperty }) => (
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
      </div>
    ))}
    <button
      type="button"
      onClick={() => setProperty(prevState => ({
        ...prevState,
        images: [...prevState.images, { url: '' }]
      }))}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      Add More Images
    </button>
  </div>
);

export default PropertyImages;
