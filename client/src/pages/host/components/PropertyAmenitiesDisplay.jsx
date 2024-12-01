import React, { useState } from 'react';
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
  FaTimes,
  FaFire,
  FaTshirt,
  FaLaptop,
  FaDoorOpen,
  FaLock,
  FaGlassWhiskey,
  FaHotel,
  FaTools,
} from 'react-icons/fa';
import { FaKitchenSet } from "react-icons/fa6";
import { RiBilliardsFill } from "react-icons/ri";
import { TbSteam } from "react-icons/tb";
import { RiFridgeFill } from "react-icons/ri";
import { MdOutdoorGrill } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { RiNetflixFill } from "react-icons/ri";
import wifiImage from '../../../assets/router.jpg';
const PropertyAmenitiesDisplay = ({ amenities }) => {
  const [viewMore, setViewMore] = useState(false);

  const generalAmenitiesList = [
    { name: 'WiFi', icon: <FaWifi />, requiresImage: false, imagePath: wifiImage },
    { name: 'Kitchen', icon: <FaKitchenSet />, requiresImage: true },
    { name: 'Parking', icon: <FaParking />, requiresImage: true },
    { name: 'Gym', icon: <FaDumbbell />, requiresImage: true },
    { name: 'Pool', icon: <FaSwimmingPool />, requiresImage: true },
    { name: 'Hot tub', icon: <FaHotTub />, requiresImage: true },
    { name: 'Beach access', icon: <FaUmbrellaBeach />, requiresImage: true },
    { name: 'Security', icon: <FaShieldAlt />, requiresImage: true },
    { name: 'Pool table', icon: <RiBilliardsFill />, requiresImage: true },
    { name: 'Outdoor dining', icon: <FaUtensils />, requiresImage: true },
    { name: 'Spa', icon: <FaSpa />, requiresImage: true },
    { name: 'Sauna', icon: <FaFireAlt />, requiresImage: true },
    { name: 'Steam Room', icon: <TbSteam />, requiresImage: true },
    { name: 'BBQ', icon: <MdOutdoorGrill />, requiresImage: true },
    { name: 'Fridge', icon: <RiFridgeFill />, requiresImage: true },
    { name: 'Air Conditioning', icon: <FaSnowflake />, requiresImage: true },
    { name: 'TV', icon: <PiTelevisionFill />, requiresImage: true },
    { name: 'Streaming Service', icon: <RiNetflixFill />, requiresImage: true },
    { name: 'Heating', icon: <FaFire />, requiresImage: true },
  ];

  const sectionAmenitiesList = [
    { name: 'WiFi', icon: <FaWifi />, requiresImage: false, imagePath: wifiImage },
    { name: 'Kitchen', icon: <FaKitchenSet />, requiresImage: true },
    { name: 'Hot tub', icon: <FaHotTub />, requiresImage: true },
    { name: 'Pool table', icon: <RiBilliardsFill />, requiresImage: true },
    { name: 'Outdoor dining', icon: <FaUtensils />, requiresImage: true },
    { name: 'Heating', icon: <FaFire />, requiresImage: true },
    { name: 'Balcony', icon: <FaHotel />, requiresImage: true },
    { name: 'Workspace', icon: <FaLaptop />, requiresImage: true },
    { name: 'Dryer', icon: <FaTshirt />, requiresImage: true },
    { name: 'Iron', icon: <FaTools />, requiresImage: true },
    { name: 'Private Entrance', icon: <FaDoorOpen />, requiresImage: true },
    { name: 'Jacuzzi', icon: <FaHotTub />, requiresImage: true },
    { name: 'Minibar', icon: <FaGlassWhiskey />, requiresImage: true },
    { name: 'Safe', icon: <FaLock />, requiresImage: true },
  ];

  const amenitiesList = [
    ...generalAmenitiesList,
    ...sectionAmenitiesList.filter(
      (sectionAmenity) =>
        !generalAmenitiesList.some((generalAmenity) => generalAmenity.name === sectionAmenity.name)
    ),
  ];

  const imagesToShow = viewMore ? amenities : amenities.slice(0, 16);

  return (
    <div className="bg-white pt-4 mt-2">
      {/* Amenity List */}
      <h2 className="text-2xl text-black-600 mb-4 bg-gray-100 p-4 border-round font-bold">
        Amenities
      </h2>
      <div className="mb-6 px-6">
        <div className="flex flex-wrap gap-4">
          {amenitiesList.map(({ name, icon }) => (
            amenities.some((amenity) => amenity.name === name) && (
              <div
                key={name}
                className="flex items-center p-2 border rounded-lg bg-white border-gray-200 text-gray-600 w-auto"
              >
                <div className="text-3xl mr-2 pr-8">{icon}</div>
                <div>
                  <h3 className="text-1xl font-semibold pr-10">{name}</h3>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="px-6 py-2">
        <h2 className="text-2xl font-bold text-black-600 mb-4">Amenities Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagesToShow.map((amenity, index) => {
      const amenityItem = amenitiesList.find((item) => item.name === amenity.name);
      const imageUrl = amenity.name === 'WiFi'
        ? wifiImage // Use the imported WiFi image
        : amenity.image?.url && amenityItem?.requiresImage
        ? `${import.meta.env.VITE_API_URL}/${amenity.image.url.replace(/\\/g, '/')}`
        : null;
            return (
              <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={amenity.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-40 bg-gray-100">
                    <div className="text-gray-500">{amenityItem?.icon}</div>
                  </div>
                )}
                <div className="absolute top-0 left-0 h-full w-9/12 bg-gradient-to-r from-black via-transparent to-transparent opacity-80 transition-opacity duration-300 hover:opacity-80">
                  <div className="flex flex-col justify-center items-start h-full p-2 text-white">
                    {amenityItem?.icon && <div className="text-2xl mb-2">{amenityItem.icon}</div>}
                    <h3 className="text-2xl font-semibold">{amenityItem?.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
          {amenities.length > 16 && !viewMore && (
            <div className="text-center col-span-full">
              <button
                onClick={() => setViewMore(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyAmenitiesDisplay;


