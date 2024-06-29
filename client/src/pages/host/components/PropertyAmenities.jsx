// src/components/PropertyAmenities.js
import React from 'react';
import { FaWifi, FaUtensils, FaParking, FaDumbbell, FaSwimmer, FaHotTub, FaUmbrellaBeach, FaLock, FaBilliards, FaChair, FaSpa, FaDoorOpen, FaSteam } from 'react-icons/fa';

const PropertyAmenities = ({ property, handleChange }) => {
  const amenitiesList = [
    { name: 'WiFi', icon: <FaWifi size={32} /> },
    { name: 'Kitchen', icon: <FaUtensils size={32} /> },
    { name: 'Parking', icon: <FaParking size={32} /> },
    { name: 'Gym', icon: <FaDumbbell size={32} /> },
    { name: 'Pool', icon: <FaSwimmer size={32} /> },
    { name: 'Hot tub', icon: <FaHotTub size={32} /> },
    { name: 'Beach access', icon: <FaUmbrellaBeach size={32} /> },
    { name: 'Security', icon: <FaLock size={32} /> },
    { name: 'Pool table', icon: <FaBilliards size={32} /> },
    { name: 'Outdoor dining', icon: <FaChair size={32} /> },
    { name: 'Spa', icon: <FaSpa size={32} /> },
    { name: 'Sauna', icon: <FaDoorOpen size={32} /> },
    { name: 'Steam Room', icon: <FaSteam size={32} /> },
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newAmenities = checked
      ? [...property.amenities, value]
      : property.amenities.filter(amenity => amenity !== value);
    
    handleChange({ target: { name: 'amenities', value: newAmenities } });
  };

  return (
    <div>
      <h2>Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <label
            key={amenity.name}
            className={`flex flex-col items-center justify-center cursor-pointer border-4 rounded-lg w-full h-28 font-bold transition duration-300 ease-in-out ${
              property.amenities.includes(amenity.name) ? 'border-blue-500 bg-blue-200' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            <input
              type="checkbox"
              value={amenity.name}
              checked={property.amenities.includes(amenity.name)}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              {amenity.icon}
            </div>
            <span className="mt-2">{amenity.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;

