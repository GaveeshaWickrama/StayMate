import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext'; // Adjust the path according to your project structure
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaSnowflake } from 'react-icons/fa';
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";
import { TbSteam } from "react-icons/tb";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutdoorGrill } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { RiNetflixFill } from "react-icons/ri";

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
    images: [{ url: '', file: null }],
    amenities: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      plan: {
        ...prevState.plan,
        [name]: value
      }
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSection(prevState => ({
      ...prevState,
      images: prevState.images.map((img, imgIndex) => imgIndex === index ? { url, file } : img)
    }));
  };

  const handleIconClick = (amenity) => {
    const newAmenities = section.amenities.includes(amenity)
      ? section.amenities.filter(item => item !== amenity)
      : [...section.amenities, amenity];
    
    setSection(prevState => ({
      ...prevState,
      amenities: newAmenities
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
    { name: 'Out door dining', icon: <FaUtensils /> },
    { name: 'Spa', icon: <FaSpa /> },
    { name: 'Sauna', icon: <FaFireAlt /> },
    { name: 'Steam Room', icon: <TbSteam /> }
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Section Details</h2>
      <div className="mb-4">
        <label className="block mb-1">Section Name:</label>
        <input
          type="text"
          name="section_name"
          value={section.section_name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Count:</label>
        <input
          type="number"
          name="count"
          value={section.count}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Beds:</label>
        <input
          type="number"
          name="beds"
          value={section.plan.beds}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={section.plan.bedrooms}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={section.plan.bathrooms}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Guests:</label>
        <input
          type="number"
          name="guests"
          value={section.plan.guests}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price Per Night:</label>
        <input
          type="number"
          name="price_per_night"
          value={section.price_per_night}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Image URL:</label>
        <input
          type="file"
          name="image"
          onChange={(e) => handleFileChange(e, 0)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <h3 className="text-xl font-bold mb-4">Select Amenities</h3>
      <div className="p-6 bg-white rounded-lg shadow-md mb-4">
        <div className="grid grid-cols-6 gap-4">
          {sectionAmenitiesList.map(({ name, icon }) => (
            <div
              key={name}
              onClick={() => handleIconClick(name)}
              className={`flex flex-col items-center p-4 border-4 rounded-lg cursor-pointer ${section.amenities.includes(name) ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
            >
              <div className="text-3xl mb-2">{icon}</div>
              <label className="text-center">{name}</label>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Section
      </button>
    </form>
  );
};

export default AddSection;

