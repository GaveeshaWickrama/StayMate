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
import { FaKitchenSet } from 'react-icons/fa6';
import { RiBilliardsFill } from 'react-icons/ri';
import { TbSteam } from 'react-icons/tb';
import { RiFridgeFill } from 'react-icons/ri';
import { MdOutdoorGrill } from 'react-icons/md';
import { PiTelevisionFill } from 'react-icons/pi';
import { RiNetflixFill } from 'react-icons/ri';
import { useProperty } from '../../../context/PropertyContext';

const PropertyAmenities = () => {
  const { property, setProperty } = useProperty();
  const [selectedImage, setSelectedImage] = useState(null);

  // Amenities List
  const generalAmenitiesList = [
    { name: 'WiFi', icon: <FaWifi />, requiresImage: false },
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
    { name: 'WiFi', icon: <FaWifi />, requiresImage: false },
    { name: 'Kitchen', icon: <FaKitchenSet />, requiresImage: true },
    { name: 'Hot tub', icon: <FaHotTub />, requiresImage: true },
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
    { name: 'Fridge', icon: <RiFridgeFill />, requiresImage: true },
    { name: 'Air Conditioning', icon: <FaSnowflake />, requiresImage: true },
    { name: 'TV', icon: <PiTelevisionFill />, requiresImage: true },
    { name: 'Streaming Service', icon: <RiNetflixFill />, requiresImage: true },
    { name: 'Heating', icon: <FaFire />, requiresImage: true },
  ];
// Combine both lists without repeating
const amenitiesList =
property.total_unique_sections === '-1'
  ? generalAmenitiesList
  : generalAmenitiesList.filter(
      (amenity) => !sectionAmenitiesList.some((sectionAmenity) => sectionAmenity.name === amenity.name)
    );


  // Handle Amenity Selection
  const handleIconClick = (amenityName) => {
    setProperty((prevProperty) => {
      const existingAmenity = prevProperty.amenities.find((amenity) => amenity.name === amenityName);

      if (existingAmenity) {
        // Remove amenity if already selected
        return {
          ...prevProperty,
          amenities: prevProperty.amenities.filter((amenity) => amenity.name !== amenityName),
        };
      }

      // Add amenity with image as `null` for WiFi
      return {
        ...prevProperty,
        amenities: [
          ...prevProperty.amenities,
          { name: amenityName, image: amenityName === 'WiFi' ? null : null },
        ],
      };
    });
  };

  // Handle Image Upload
  const handleFileChange = (amenityName, file) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setProperty((prevProperty) => ({
      ...prevProperty,
      amenities: prevProperty.amenities.map((amenity) =>
        amenity.name === amenityName
          ? { ...amenity, image: { url, file } }
          : amenity
      ),
    }));
  };

  // Remove Image
  const handleRemoveImage = (amenityName, event) => {
    event.stopPropagation();
    setProperty((prevProperty) => ({
      ...prevProperty,
      amenities: prevProperty.amenities.map((amenity) =>
        amenity.name === amenityName ? { ...amenity, image: null } : amenity
      ),
    }));
  };

  // View Image in Modal
  const handleImageClick = (url, event) => {
    event.stopPropagation();
    setSelectedImage(url);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const isValid = property.amenities.length > 0;

  return (
    <div className="mx-auto px-8">
      <h2 className="text-4xl font-extrabold text-black mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">
        Select Amenities
      </h2>
      {!isValid && <p className="text-red-600 mb-4">Please select at least one amenity.</p>}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-4 gap-4">
          {amenitiesList.map(({ name, icon, requiresImage }) => {
            const isSelected = property.amenities.some((amenity) => amenity.name === name);
            const selectedAmenity = property.amenities.find((amenity) => amenity.name === name);
            const hasImage = selectedAmenity?.image?.url;

            return (
              <div
                key={name}
                className={`relative flex items-center justify-center p-4 border-4 rounded-lg cursor-pointer ${
                  isSelected ? 'bg-blue-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'
                }`}
                style={{ height: '180px', width: '380px' }}
                onClick={() => handleIconClick(name)}
              >
                {hasImage ? (
                  <>
                    <img
                      src={selectedAmenity.image.url}
                      alt={`${name} preview`}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                      onClick={(e) => handleImageClick(selectedAmenity.image.url, e)}
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-lg">
                      <div className="text-2xl text-white">{icon}</div>
                      <label className="text-center text-white">{name}</label>
                    </div>
                    <FaTimes
                      className="absolute top-2 right-2 text-white cursor-pointer"
                      onClick={(e) => handleRemoveImage(name, e)}
                    />
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-2">{icon}</div>
                    <label className="text-center">{name}</label>
                    {isSelected && requiresImage && (
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

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={closeImageModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Detailed View" className="rounded-lg max-w-full max-h-full" />
            <button onClick={closeImageModal} className="absolute top-2 right-2 text-white text-2xl">
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyAmenities;
