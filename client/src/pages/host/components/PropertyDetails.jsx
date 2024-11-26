import React, { useState } from 'react';
import houseIcon from '../../../assets/buildingTypes/home.png';
import apartmentIcon from '../../../assets/buildingTypes/apartment.png';
import villaIcon from '../../../assets/buildingTypes/vila.png';
import cottageIcon from '../../../assets/buildingTypes/cottage.png';
import hotelIcon from '../../../assets/buildingTypes/hotel.png';
import bungalowIcon from '../../../assets/buildingTypes/bungalow.png';
// for desc 500 - 2000
// for title 1 -  100

const PropertyTypeButton = ({ type, isSelected, handleChange }) => (
  <label
    className={`flex flex-col items-center justify-center cursor-pointer border-4 rounded-lg w-full h-28 font-bold transition duration-300 ease-in-out ${
      isSelected ? 'border-blue-500 bg-blue-200' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
    }`}
  >
    <input
      type="radio"
      name="type"
      value={type.name}
      checked={isSelected}
      onChange={handleChange}
      className="hidden"
    />
    <img src={type.icon} alt={type.name} className="w-12 h-12 mb-2" />
    <span className="mt-2">{type.name}</span>
  </label>
);

const PropertyDetails = ({ property, handleChange }) => {
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const propertyTypes = [
    { name: 'House', icon: houseIcon },
    { name: 'Apartment', icon: apartmentIcon },
    { name: 'Villa', icon: villaIcon },
    { name: 'Cottage', icon: cottageIcon },
    { name: 'Hotel', icon: hotelIcon },
    { name: 'Bungalow', icon: bungalowIcon }
  ];

  const validateTitle = (title) => {
    const charCount = title.trim().length;
    if (charCount < 1) {
      setTitleError('Title must be at least 10 characters.');
    } else if (charCount > 100) {
      setTitleError('Title must not exceed 100 characters.');
    } else {
      setTitleError('');
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    validateTitle(value);
    handleChange(e);
  };

  const validateDescription = (desc) => {
    const charCount = desc.trim().length;
    if (charCount < 0) {
      setDescriptionError('Description must be at least 500 characters.');
    } else if (charCount > 2000) {
      setDescriptionError('Description must not exceed 2000 characters.');
    } else {
      setDescriptionError('');
    }
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    validateDescription(value);
    handleChange(e);
  };

  return (
    <div className="container mx-auto px-8">
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">
        Property Details
      </h2>
      <div className="flex-col p-10 bg-gray-50 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleTitleChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {titleError && (
            <p className="text-red-500 text-sm mt-1">{titleError}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Description:</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleDescriptionChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
          )}
        </div>
        <div className="my-8">
          <label className="font-semibold">Property Type:</label>
          <div className="mt-8 flex space-x-20">
            {propertyTypes.map((type) => (
              <PropertyTypeButton
                key={type.name}
                type={type}
                isSelected={property.type === type.name}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
