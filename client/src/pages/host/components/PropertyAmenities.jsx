import React, { useState } from 'react';
import { FaWifi, FaParking, FaDumbbell, FaSwimmingPool, FaHotTub, FaUmbrellaBeach, FaShieldAlt, FaUtensils, FaSpa, FaFireAlt, FaSnowflake, FaTimes, FaFire, FaTshirt, FaLaptop, FaDoorOpen, FaLock, FaGlassWhiskey, FaHotel, FaTools } from 'react-icons/fa';  // Updated import for additional icons
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
  const [selectedImage, setSelectedImage] = useState(null);

  const generalAmenitiesList = [
    { name: 'WiFi', icon: <FaWifi /> }, // WiFi will not require an image
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
    { name: 'Streaming Service', icon: <RiNetflixFill /> },
    { name: 'Heating', icon: <FaFire /> }
  ];

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

  const filteredSectionAmenitiesList = sectionAmenitiesList.filter(
    sectionAmenity => !generalAmenitiesList.some(generalAmenity => generalAmenity.name === sectionAmenity.name)
  );

  const amenitiesList = property.total_unique_sections == -1 ? generalAmenitiesList : filteredSectionAmenitiesList;

  const handleIconClick = (amenityName) => {
    const existingAmenity = property.amenities.find(amenity => amenity.name === amenityName);

    if (existingAmenity && !existingAmenity.image?.url) {
      setProperty(prevProperty => ({
        ...prevProperty,
        amenities: prevProperty.amenities.filter(amenity => amenity.name !== amenityName)
      }));
    } else if (!existingAmenity) {
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

  const handleRemoveImage = (amenityName, event) => {
    event.stopPropagation();
    setProperty(prevProperty => ({
      ...prevProperty,
      amenities: prevProperty.amenities.map(amenity =>
        amenity.name === amenityName ? { ...amenity, image: null } : amenity
      )
    }));
  };

  const handleImageClick = (url, event) => {
    event.stopPropagation();  // Prevent triggering the unselect logic
    setSelectedImage(url);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Validation for "at least one amenity"
  const isValid = property.amenities.length > 0;

  return (
    <div className=' mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Select Amenities</h2>
      {!isValid && (
        <p className="text-red-600 mb-4">Please select at least one amenity.</p>
      )}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-4 gap-2">
          {amenitiesList.map(({ name, icon }) => {
            const isSelected = property.amenities.some(amenity => amenity.name === name);
            const selectedAmenity = property.amenities.find(amenity => amenity.name === name);
            const hasImage = selectedAmenity?.image?.url;

            return (
              <div
                key={name}
                className={`relative flex items-center justify-center p-4 border-4 rounded-lg cursor-pointer ${isSelected ? 'bg-white-100 border-blue-400 text-blue-600' : 'bg-white border-gray-200 text-gray-600'}`}
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
                    <div className="text-5xl mb-2 mr-4">
                      {icon}
                    </div>
                    <label className="text-center">{name}</label>
                    {isSelected && name !== 'WiFi' && (
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

      {/* Custom Modal for viewing the image in detail */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeImageModal}>
          <div className="relative">
            <img src={selectedImage} alt="Detailed View" className="rounded-lg max-w-full max-h-full" />
            <button onClick={closeImageModal} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyAmenities;
