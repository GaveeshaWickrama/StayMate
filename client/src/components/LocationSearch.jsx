import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const LocationSearchBar = ({ onSearch }) => {
  const [radius, setRadius] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const locationInputRef = useRef(null);

  useEffect(() => {
    const loadAutocomplete = () => {
      if (window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current, {
          types: ['geocode'],
          componentRestrictions: { country: 'LK' } // Restrict to Sri Lanka
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const location = {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              address: place.formatted_address,
            };
            console.log('Place selected:', location); // Debugging log
            setSelectedLocation(location); // Store the selected location
          }
        });
      } else {
        console.error('Google Maps JavaScript API library is not loaded.');
      }
    };

    loadAutocomplete();
  }, []);

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleSearchClick = () => {
    if (selectedLocation) {
      console.log('Manual search:', { location: selectedLocation, radius }); // Debugging log
      onSearch({ location: selectedLocation, radius });
    } else {
      console.log('Manual search with address:', { location: locationInputRef.current.value, radius }); // Debugging log
      onSearch({ location: locationInputRef.current.value, radius });
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-lg rounded-lg px-6 py-4 w-full max-w-4xl mx-auto mb-8 border">
      <div className="flex items-center flex-grow">
        <FaMapMarkerAlt className="text-blue-500 mr-4 mt-4" style={{ fontSize: '26px' }} />
        <div className="flex flex-col w-full">
          <label className="text-sm font-bold text-gray-700 mb-1">Where</label>
          <input
            type="text"
            ref={locationInputRef}
            placeholder="Search destinations"
            className="outline-none text-gray-600 text-base w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="border-l-2 h-16 mx-4 border-blue-500"></div>
      <div className="flex items-center flex-grow">
        <div className="flex flex-col w-full">
          <label className="text-sm font-bold text-gray-700 mb-1">Radius</label>
          <input
            type="number"
            value={radius}
            onChange={handleRadiusChange}
            placeholder="Enter radius (km)"
            className="outline-none text-gray-600 text-base w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <button
        onClick={handleSearchClick}
        className="bg-blue-500 text-white rounded-full p-3 ml-4 mt-4 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-200"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default LocationSearchBar;


