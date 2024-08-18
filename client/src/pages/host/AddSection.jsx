import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext'; // Adjust the path according to your project structure
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaUpload } from 'react-icons/fa';
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";
import { TbSteam } from "react-icons/tb";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutdoorGrill } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { RiNetflixFill } from "react-icons/ri";

const sectionAmenitiesList = [
  { name: 'WiFi', icon: <FaWifi /> },
  { name: 'Kitchen', icon: <FaKitchenSet /> },
  { name: 'Parking', icon: <FaParking /> },
  { name: 'Gym', icon: <FaDumbbell /> },
  { name: 'Pool', icon: <FaSwimmingPool /> },
  { name: 'Hot tub', icon: <FaHotTub /> },
  { name: 'Beach access', icon: <FaUmbrellaBeach /> },
  { name: 'Security', icon: <FaShieldAlt /> },
  { name: 'Pool table', icon: <RiBilliardsFill /> },
  { name: 'Outdoor dining', icon: <FaUtensils /> },
  { name: 'Spa', icon: <FaSpa /> },
  { name: 'Sauna', icon: <FaFireAlt /> },
  { name: 'Steam Room', icon: <TbSteam /> }
];

const AddSection = () => {
  const { property, setProperty } = useProperty();
  const navigate = useNavigate();
  const [section, setSection] = useState({
    section_name: '',
    count: 1,
    plan: {
      beds: 1,
      bedrooms: 1,
      bathrooms: 1,
      guests: 1,
    },
    price_per_night: 0,
    images: [],
    amenities: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlanChange = (name, value) => {
    setSection(prevState => ({
      ...prevState,
      plan: {
        ...prevState.plan,
        [name]: value
      }
    }));
  };

  const handleFiles = (files) => {
    let newImages = [];
    for (let file of files) {
      const url = URL.createObjectURL(file);
      newImages.push({ url, file });
    }
    setSection(prevState => ({
      ...prevState,
      images: [...prevState.images, ...newImages]
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = section.images.filter((_, imgIndex) => imgIndex !== index);
    setSection(prevState => ({
      ...prevState,
      images: newImages
    }));
  };

  const handleIconClick = (amenityName) => {
    const existingAmenity = section.amenities.find(amenity => amenity.name === amenityName);

    if (existingAmenity) {
      // Remove amenity if already selected
      setSection(prevState => ({
        ...prevState,
        amenities: prevState.amenities.filter(amenity => amenity.name !== amenityName)
      }));
    } else {
      // Add amenity with an empty image field
      setSection(prevState => ({
        ...prevState,
        amenities: [...prevState.amenities, { name: amenityName, image: null }]
      }));
    }
  };

  const handleFileChange = (amenityName, file) => {
    const url = URL.createObjectURL(file);
    setSection(prevState => ({
      ...prevState,
      amenities: prevState.amenities.map(amenity =>
        amenity.name === amenityName ? { ...amenity, image: { url, file } } : amenity
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProperty(prevProperty => ({
      ...prevProperty,
      sections: [...prevProperty.sections, section]
    }));
    navigate('/host/add-property');
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-8">
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Add Section Details</h2>
      <SectionDetails section={section} handleChange={handleChange} handlePlanChange={handlePlanChange} />
      <SectionAmenities section={section} handleIconClick={handleIconClick} handleFileChange={handleFileChange} />
      <SectionImages section={section} handleFiles={handleFiles} handleDeleteImage={handleDeleteImage} />
      <SectionPrice section={section} handleChange={handleChange} />
      <div className='my-10'> <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded"> Add Section </button> </div>
    </form>
  );
};

const SectionDetails = ({ section, handleChange, handlePlanChange }) => (
  <div className="mt-8">
    <h3 className="text-xl font-bold mt-8 mb-6">Details</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title:</label>
        <input
          type="text"
          name="section_name"
          value={section.section_name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4 ml-20">
        <label className="block mb-1 font-semibold">Count:</label>
        <input
          type="number"
          name="count"
          value={section.count}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
    </div>
    <div className="grid grid-cols-2">
      {renderNumberInput("Guests", "guests", section.plan.guests, handlePlanChange, 1)}
      {renderNumberInput("Bedrooms", "bedrooms", section.plan.bedrooms, handlePlanChange, 1)}
      {renderNumberInput("Beds", "beds", section.plan.beds, handlePlanChange, 1)}
      {renderNumberInput("Bathrooms", "bathrooms", section.plan.bathrooms, handlePlanChange, 1)}
    </div>
  </div>
);

const SectionImages = ({ section, handleFiles, handleDeleteImage }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Add Images</h3>
      <div
        className={`border-2 border-dashed p-8 rounded mb-4 cursor-pointer text-center`}
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
        {section.images && section.images.length > 0 ? (
          section.images.map((image, index) => (
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

const SectionAmenities = ({ section, handleIconClick, handleFileChange }) => (
  <div>
    <h3 className="text-xl font-bold mt-8 mb-4">Select Amenities</h3>
    <div className="p-0 bg-white rounded-lg">
      <div className="grid grid-cols-6 gap-4">
        {sectionAmenitiesList.map(({ name, icon }) => {
          const isSelected = section.amenities.some(amenity => amenity.name === name);
          const selectedAmenity = section.amenities.find(amenity => amenity.name === name);
          return (
            <div
              key={name}
              className={`flex flex-col items-center p-4 border-4 rounded-lg cursor-pointer ${isSelected ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
            >
              <div className="text-3xl mb-2" onClick={() => handleIconClick(name)}>{icon}</div>
              <label className="text-center">{name}</label>
              {isSelected && (
                <div className="mt-4 w-full">
                  <label className="block mb-2 font-semibold">Upload Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(name, e.target.files[0])}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                  />
                  {selectedAmenity?.image?.url && (
                    <div className="mt-2">
                      <img
                        src={selectedAmenity.image.url}
                        alt={`${name} preview`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const SectionPrice = ({ section, handleChange }) => (
  <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
    <h3 className="text-lg font-bold mb-4">Price Per Night</h3>
    <div className="flex items-center text-lg">
      <label className="block font-medium text-gray-900 mr-4">Price:</label>
      <input
        type="number"
        name="price_per_night"
        value={section.price_per_night}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-lg"
        min="0"
      />
      <span className="ml-2 text-gray-600">Rs</span>
    </div>
  </div>
);

const renderNumberInput = (label, name, value, handleChange, min = 0) => (
  <div className="grid grid-cols-6 my-6">
    <label className="block font-medium text-gray-900">{label}</label>
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => handleChange(name, Math.max(min, value - 1))}
        className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >-</button>
      <input
        type="text"
        name={name}
        value={value}
        readOnly
        className="py-2 w-12 text-center border-t border-b border-gray-300"
      />
      <button
        type="button"
        onClick={() => handleChange(name, value + 1)}
        className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >+</button>
    </div>
  </div>
);

export default AddSection;
