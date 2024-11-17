import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useProperty } from '../../context/PropertyContext';

const libraries = ['places'];
const mapContainerStyle = {
  height: '400px',
  width: '100%',
};
const defaultCenter = {
  lat: 7.8731,
  lng: 80.7718,
};

const AddLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { property, updateLocation } = useProperty();
  const [propertyLocation, setPropertyLocation] = useState(location.state?.location || property.location || {
    address: '',
    district: '',
    province: '',
    latitude: defaultCenter.lat,
    longitude: defaultCenter.lng,
    zipcode: '',
  });
  const [googleResponse, setGoogleResponse] = useState(null);
  const [isMapsApiLoaded, setIsMapsApiLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'lk' },
    },
    debounce: 300,
  });

  useEffect(() => {
    if (propertyLocation.address) {
      setValue(propertyLocation.address, false);
    }
  }, [propertyLocation.address, setValue]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsMapsApiLoaded(true);
        clearInterval(intervalId);
      }
    }, 100);
  }, []);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPropertyLocation(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      const addressComponents = results[0].address_components.reduce((acc, component) => {
        const types = component.types;
        if (types.includes('administrative_area_level_1')) {
          acc.province = component.long_name;
        } else if (types.includes('postal_code')) {
          acc.zipcode = component.long_name;
        } else if (types.includes('administrative_area_level_2')) {
          acc.district = component.long_name;
        }
        return acc;
      }, {});
      const newLocation = {
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents,
        geocoding_response: JSON.stringify(results[0]),
      };
      setPropertyLocation(newLocation);
      updateLocation(newLocation);
      setGoogleResponse(results[0]);
    } catch (error) {
      console.error('Error fetching location details: ', error);
    }
  };

  const handleMarkerDragEnd = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    try {
      const results = await getGeocode({ location: { lat, lng } });
      const addressComponents = results[0].address_components.reduce((acc, component) => {
        const types = component.types;
        if (types.includes('administrative_area_level_1')) {
          acc.province = component.long_name;
        } else if (types.includes('postal_code')) {
          acc.zipcode = component.long_name;
        } else if (types.includes('administrative_area_level_2')) {
          acc.district = component.long_name;
        }
        return acc;
      }, {});
      const newLocation = {
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents,
        geocoding_response: JSON.stringify(results[0]),
      };
      setPropertyLocation(newLocation);
      updateLocation(newLocation);
      setValue(results[0].formatted_address, false);
      setGoogleResponse(results[0]);
    } catch (error) {
      console.error('Error fetching location details: ', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!propertyLocation.address.trim()) newErrors.address = 'Address is required';
    if (!propertyLocation.district.trim()) newErrors.district = 'District is required';
    if (!propertyLocation.province.trim()) newErrors.province = 'Province is required';
    if (!propertyLocation.zipcode.trim()) newErrors.zipcode = 'Zip code is required';
    if (!propertyLocation.latitude) newErrors.latitude = 'Latitude is required';
    if (!propertyLocation.longitude) newErrors.longitude = 'Longitude is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, stop submission.
    }

    navigate('/host/add-property', { state: { ...location.state, location: propertyLocation, stage: 6 } });
  };

  if (!isMapsApiLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Location Information</h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Address:</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search for an address"
            className={`block w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
            required
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          {status === 'OK' && (
            <ul className="border border-gray-300 mt-2 rounded-lg max-h-48 overflow-y-auto bg-white shadow-lg">
              {data.map(({ place_id, description }) => (
                <li
                  key={place_id}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelect(description)}
                >
                  {description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Additional fields */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">District:</label>
            <input
              type="text"
              name="district"
              value={propertyLocation.district}
              onChange={handleLocationChange}
              className={`block w-full p-3 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Province:</label>
            <input
              type="text"
              name="province"
              value={propertyLocation.province}
              onChange={handleLocationChange}
              className={`block w-full p-3 border ${errors.province ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
          </div>
        </div>

        {/* Other fields */}
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Latitude:</label>
            <input
              type="number"
              name="latitude"
              value={propertyLocation.latitude}
              onChange={handleLocationChange}
              className={`block w-full p-3 border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Longitude:</label>
            <input
              type="number"
              name="longitude"
              value={propertyLocation.longitude}
              onChange={handleLocationChange}
              className={`block w-full p-3 border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Zip Code:</label>
            <input
              type="text"
              name="zipcode"
              value={propertyLocation.zipcode}
              onChange={handleLocationChange}
              className={`block w-full p-3 border ${errors.zipcode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-blue-500`}
              required
            />
            {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
          </div>
        </div>

        <div className="my-8">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={20}
            center={{
              lat: propertyLocation.latitude,
              lng: propertyLocation.longitude,
            }}
          >
            {propertyLocation.latitude && propertyLocation.longitude && (
              <Marker
                position={{
                  lat: propertyLocation.latitude,
                  lng: propertyLocation.longitude,
                }}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            )}
          </GoogleMap>
        </div>

        <button
          type="submit"
          className="w-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
        >
          Save Location
        </button>
      </form>

      {googleResponse && (
        <pre className="mt-4 p-4 rounded">
          {/* {JSON.stringify(googleResponse, null, 2)} */}
        </pre>
      )}
    </div>
  );
};

export default AddLocation;
