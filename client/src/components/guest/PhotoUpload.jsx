import React, { useState } from 'react';

const PhotoUpload = () => {
  const [photos, setPhotos] = useState([]);

const handlePhotoUpload = (event) => {
  const files = Array.from(event.target.files);
  setPhotos((prevPhotos) => [...prevPhotos, ...files]);
};

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-md mx-4 sm:mx-10 md:mx-20 lg:mx-40 mt-11">
      <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
      <div className="flex space-x-4">
        {photos.map((photo, index) => (
          <div key={index} className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-200">
            <img src={URL.createObjectURL(photo)} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
          </div>
        ))}
        {photos.length < 3 && (
          <label className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-200 cursor-pointer">
            <span className="text-2xl font-bold text-gray-500">+</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default PhotoUpload;
