// src/components/Amenities.js
import React from 'react';
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaSnowflake } from 'react-icons/fa';
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";
import { TbSteam } from "react-icons/tb";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutdoorGrill } from "react-icons/md";
import { useProperty } from '../../../context/PropertyContext';
import { PiTelevisionFill } from "react-icons/pi";
import { RiNetflixFill } from "react-icons/ri";

const PropertyAmenities = ({ handleChange }) => {
  const { property } = useProperty();

  const generalAmenitiesList = [
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
    { name: 'Steam Room', icon: <TbSteam /> },
    { name: 'BBQ', icon: <MdOutdoorGrill /> },

    { name: 'Fridge', icon: <RiFridgeFill /> },
    { name: 'Air Conditioning', icon: <FaSnowflake /> },
    { name: 'TV', icon: <PiTelevisionFill /> },
    { name: 'Streaming Service', icon: <RiNetflixFill /> }
  ];

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

  const amenitiesList = property.total_unique_sections == -1 ? generalAmenitiesList : sectionAmenitiesList;
  console.log(amenitiesList); 
  const handleIconClick = (amenity) => {
    const newAmenities = property.amenities.includes(amenity)
      ? property.amenities.filter(item => item !== amenity)
      : [...property.amenities, amenity];
    
    handleChange({ target: { name: 'amenities', value: newAmenities } });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Amenities</h2>
      <div className="grid grid-cols-6 gap-4">
        {amenitiesList.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => handleIconClick(name)}
            className={`flex flex-col items-center p-4 border-4 rounded-lg cursor-pointer ${property.amenities.includes(name) ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <label className="text-center">{name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;

