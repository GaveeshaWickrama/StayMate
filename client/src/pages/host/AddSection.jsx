import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';  // Corrected the duplicate import
import { FaUpload } from 'react-icons/fa';

// Importing icons
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaSnowflake, FaTimes, FaFire, FaTshirt, FaLaptop, FaDoorOpen, FaLock, FaGlassWhiskey, FaHotel, FaTools } from 'react-icons/fa';  
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";



const sectionAmenitiesList = [
  { name: 'WiFi', icon: <FaWifi /> },
  { name: 'Kitchen', icon: <FaKitchenSet /> },
  { name: 'Hot tub', icon: <FaHotTub /> },
  { name: 'Pool table', icon: <RiBilliardsFill /> },
  { name: 'Outdoor dining', icon: <FaUtensils /> },
  { name: 'Heating', icon: <FaFire /> },
  { name: 'Balcony', icon: <FaHotel /> },
  { name: 'Workspace', icon: <FaLaptop /> },
  { name: 'Dryer', icon: <FaTshirt /> },
  { name: 'Iron', icon: <FaTools /> }, 
  { name: 'Private Entrance', icon: <FaDoorOpen /> },
  { name: 'Jacuzzi', icon: <FaHotTub /> },
  { name: 'Minibar', icon: <FaGlassWhiskey /> },
  { name: 'Safe', icon: <FaLock /> }
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

  const [errors, setErrors] = useState({});

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
      setSection(prevState => ({
        ...prevState,
        amenities: prevState.amenities.filter(amenity => amenity.name !== amenityName)
      }));
    } else {
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

  const validateForm = () => {
    const newErrors = {};
    if (!section.section_name.trim()) {
      newErrors.section_name = 'Section name is required';
    }
    if (section.count <= 0) {
      newErrors.count = 'Count must be greater than zero';
    }
    if (section.price_per_night <= 0) {
      newErrors.price_per_night = 'Price per night must be greater than zero';
    }
    if (section.amenities.length === 0) {
      newErrors.amenities = 'At least one amenity must be selected';
    }
    if (section.images.length === 0) {
      newErrors.images = 'At least one image must be uploaded';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop the form submission if validation fails
    }

    setProperty(prevProperty => ({
      ...prevProperty,
      sections: [...prevProperty.sections, section]
    }));

    navigate('/host/add-property');
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-8">
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Add Section Details</h2>

      <SectionDetails section={section} handleChange={handleChange} handlePlanChange={handlePlanChange} errors={errors} />
      <SectionAmenities section={section} handleIconClick={handleIconClick} handleFileChange={handleFileChange} errors={errors} />
      <SectionImages section={section} handleFiles={handleFiles} handleDeleteImage={handleDeleteImage} errors={errors} />
      <SectionPrice section={section} handleChange={handleChange} errors={errors} />

      <div className='my-10'>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded"> Add Section </button>
      </div>
    </form>
  );
};

const SectionDetails = ({ section, handleChange, handlePlanChange, errors }) => (
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
          className={`block w-full p-2 border ${errors.section_name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          required
        />
        {errors.section_name && <p className="text-red-500 text-sm">{errors.section_name}</p>}
      </div>
      <div className="mb-4 ml-20">
        <label className="block mb-1 font-semibold">Count:</label>
        <input
          type="number"
          name="count"
          value={section.count}
          onChange={handleChange}
          className={`block w-full p-2 border ${errors.count ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          required
        />
        {errors.count && <p className="text-red-500 text-sm">{errors.count}</p>}
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

const SectionImages = ({ section, handleFiles, handleDeleteImage, errors }) => {
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Add Images</h3>
      <div
        className={`border-2 border-dashed p-8 rounded mb-4 cursor-pointer text-center ${errors.images ? 'border-red-500' : ''}`}
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
      {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
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

const SectionAmenities = ({ section, handleIconClick, handleFileChange, errors }) => {
  const amenitiesWithoutImages = ['WiFi'];  // List of amenities that do not need images

  return (
    <div>
      <h3 className="text-xl font-bold mt-8 mb-4">Select Amenities</h3>
      {errors.amenities && <p className="text-red-500 text-sm">{errors.amenities}</p>}
      <div className="p-0 bg-white rounded-lg">
        <div className="grid grid-cols-5 gap-2">
          {sectionAmenitiesList.map(({ name, icon }) => {
            const isSelected = section.amenities.some(amenity => amenity.name === name);
            const selectedAmenity = section.amenities.find(amenity => amenity.name === name);
            const hasImage = selectedAmenity?.image?.url;

            return (
              <div
                key={name}
                className={`relative flex items-center justify-center p-4 border-4 rounded-lg cursor-pointer ${isSelected ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
                style={{ height: '160px', width: '260px' }}
                onClick={() => handleIconClick(name)}
              >
                {hasImage ? (
                  <img
                    src={selectedAmenity.image.url}
                    alt={`${name} preview`}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="text-5xl mb-2 mr-4">
                      {icon}
                    </div>
                    <label className="text-center">{name}</label>
                    {isSelected && !amenitiesWithoutImages.includes(name) && (  // Only show file input if the amenity needs an image
                      <div className="absolute bottom-2 left-2 right-2">
                        <input
                          type="file"
                          accept="image/*"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleFileChange(name, e.target.files[0])}
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          aria-label="Add Image"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SectionPrice = ({ section, handleChange, errors }) => (
  <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
    <h3 className="text-lg font-bold mb-4">Price Per Night</h3>
    <div className="flex items-center text-lg">
      <label className="block font-medium text-gray-900 mr-4">Price:</label>
      <input
        type="number"
        name="price_per_night"
        value={section.price_per_night}
        onChange={handleChange}
        className={`p-2 border ${errors.price_per_night ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
        min="0"
      />
      <span className="ml-2 text-gray-600">Rs </span>
      {errors.price_per_night && <p className="text-red-500 text-sl p-2">{errors.price_per_night}</p>}
      
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
