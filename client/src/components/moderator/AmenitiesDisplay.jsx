import React from 'react';
import {
  FaWifi,
  FaParking,
  FaDumbbell,
  FaSwimmingPool,
  FaHotTub,
  FaUmbrellaBeach,
  FaShieldAlt,
  FaUtensils,
  FaSpa,
  FaFireAlt,
  FaSnowflake,
  FaFire,
} from 'react-icons/fa';
import { RiNetflixFill, RiBilliardsFill, RiFridgeFill } from "react-icons/ri";
import { PiTelevisionFill } from "react-icons/pi";
import { MdOutdoorGrill } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";

const AmenitiesDisplay = ({ amenities }) => {
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
    { name: 'BBQ', icon: <MdOutdoorGrill /> },
    { name: 'Fridge', icon: <RiFridgeFill /> },
    { name: 'Air Conditioning', icon: <FaSnowflake /> },
    { name: 'TV', icon: <PiTelevisionFill /> },
    { name: 'Streaming Service', icon: <RiNetflixFill /> },
    { name: 'Heating', icon: <FaFire /> },
  ];

  const normalizePath = (path) => path.replace(/\\/g, '/');

  // Match selected amenities with the predefined amenities list
  const selectedAmenities = amenities.map((amenity) => ({
    ...amenitiesList.find((item) => item.name === amenity.name),
    imageUrl: amenity.name === 'WiFi' 
      ? null 
      : amenity.image?.url 
        ? `${import.meta.env.VITE_API_URL}/${normalizePath(amenity.image.url)}`
        : null,
  }));

  return (
    <div className="bg-white pt-4 mt-2">
      <h2 className="text-2xl text-black-600 mb-4 bg-gray-100 p-4 border-round font-bold">
        Selected Amenities
      </h2>
      <div className="flex flex-wrap gap-4 px-6">
        {selectedAmenities.map((amenity, index) => (
          amenity && (
            <div key={index} className="flex flex-col items-center p-2 border rounded-lg bg-white border-gray-200 text-gray-600 w-auto">
              <div className="text-3xl mb-2">{amenity.icon}</div>
              <h3 className="text-1xl font-semibold">{amenity.name}</h3>
              {amenity.imageUrl && (
                <img
                  src={amenity.imageUrl}
                  alt={amenity.name}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default AmenitiesDisplay;
