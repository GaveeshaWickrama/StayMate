import React, { useState } from 'react';
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
  const { property, setProperty } = useProperty();

  const amenitiesList = [
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
    { name: 'Steam Room', icon: <TbSteam /> },
    { name: 'BBQ', icon: <MdOutdoorGrill /> },
    { name: 'Fridge', icon: <RiFridgeFill /> },
    { name: 'Air Conditioning', icon: <FaSnowflake /> },
    { name: 'TV', icon: <PiTelevisionFill /> },
    { name: 'Streaming Service', icon: <RiNetflixFill /> }
  ];

  const handleIconClick = (amenityName) => {
    const existingAmenity = property.amenities.find(amenity => amenity.name === amenityName);
    if (existingAmenity) {
      // Remove amenity if already selected
      setProperty(prevProperty => ({
        ...prevProperty,
        amenities: prevProperty.amenities.filter(amenity => amenity.name !== amenityName)
      }));
    } else {
      // Add amenity with an empty image field
      setProperty(prevProperty => ({
        ...prevProperty,
        amenities: [...prevProperty.amenities, { name: amenityName, image: null }]
      }));
    }
  };

  const handleFileChange = (amenityName, file) => {
    const url = URL.createObjectURL(file);
    setProperty(prevProperty => ({
      ...prevProperty,
      amenities: prevProperty.amenities.map(amenity =>
        amenity.name === amenityName ? { ...amenity, image: { url, file } } : amenity
      )
    }));
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Select Amenities</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-6 gap-4">
          {amenitiesList.map(({ name, icon }) => {
            const isSelected = property.amenities.some(amenity => amenity.name === name);
            const selectedAmenity = property.amenities.find(amenity => amenity.name === name);
            return (
              <div
                key={name}
                onClick={() => handleIconClick(name)}
                className={`relative flex flex-col items-center p-4 border-4 rounded-lg cursor-pointer ${isSelected ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
              >
                <div className="text-3xl mb-2">{icon}</div>
                <label className="text-center">{name}</label>
                {isSelected && (
                  <div className="mt-4 w-full">
                    <label className="block mb-2 font-semibold">Upload Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onClick={(e) => e.stopPropagation()}
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
};

export default PropertyAmenities;

