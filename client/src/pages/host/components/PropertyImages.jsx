import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';

const PropertyImages = ({ property, setProperty }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    let files = e.target.files;
    if (files.length) {
      handleFiles(files);
      e.target.value = null; // Reset the input value after handling files
    }
  };

  const handleFiles = (files) => {
    let newImages = [];
    for (let file of files) {
      const url = URL.createObjectURL(file);
      newImages.push({ url, file });
    }
    setProperty(prevState => ({
      ...prevState,
      images: [...prevState.images, ...newImages]
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = property.images.filter((_, imgIndex) => imgIndex !== index);
    setProperty(prevState => ({
      ...prevState,
      images: newImages
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Add Images</h2> 
      <div
        className={`border-2 border-dashed p-8 rounded mb-4 cursor-pointer text-center ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
        <p className="text-gray-700">Drag and drop or <span className="text-blue-500 underline">browse</span> to upload</p>
        <p className="text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {property.images && property.images.length > 0 ? (
          property.images.map((image, index) => (
            image.url && (
              <div key={index} className="relative mb-4 mr-4">
                <img
                  src={image.url}
                  alt={`Property ${index}`}
                  className="w-64 h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-0 right-0 bg-black text-white py-1 px-3"
                >
                  &times;
                </button>
              </div>
            )
          ))
        ) : (
          <p className="text-lg">No images selected</p>
        )}
      </div>
    </div>
  );
};

export default PropertyImages;







