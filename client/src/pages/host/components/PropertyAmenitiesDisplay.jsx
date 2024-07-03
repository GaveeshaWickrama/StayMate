// src/components/PropertyAmenitiesDisplay.js
import React from 'react';
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaSnowflake } from 'react-icons/fa';
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";
import { TbSteam } from "react-icons/tb";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutdoorGrill } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { RiNetflixFill } from "react-icons/ri";

const PropertyAmenitiesDisplay = ({ amenities }) => {
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

  return (
    <div className='p-6 bg-white rounded-lg shadow-md mt-2'>
      <h2 className="text-2xl font-bold text-black-600 mb-4 ">Amenities</h2>
     
        <div className="grid grid-cols-12 gap-4">
          {amenitiesList.map(({ name, icon }) => (
            amenities.includes(name) && (
              <div
                key={name}
                className={`flex flex-col items-center p-3 border-4 rounded-lg bg-white border-blue-500 text-blue-500`}
              >
                <div className="text-4xl mb-2">{icon}</div>
                <label className="text-center">{name}</label>
              </div>
            )
          ))}
        </div>
     
    </div>
  );
};

export default PropertyAmenitiesDisplay;
