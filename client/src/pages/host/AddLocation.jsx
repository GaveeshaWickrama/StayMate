import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

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
  const [propertyLocation, setPropertyLocation] = useState(location.state?.location || {
    address: '',
    latitude: 0,
    longitude: 0,
    district: '',
    province: '',
    zipcode: ''
  });
  const [googleResponse, setGoogleResponse] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPropertyLocation(prevState => ({
      ...prevState,
      [name]: value
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
      setPropertyLocation({
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents
      });
      setGoogleResponse(results[0]); // Store the Google response object
    } catch (error) {
      console.error("Error fetching location details: ", error);
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

      setPropertyLocation({
        address: results[0].formatted_address,
        latitude: lat,
        longitude: lng,
        ...addressComponents
      });
      setValue(results[0].formatted_address, false);
      setGoogleResponse(results[0]);
    } catch (error) {
      console.error("Error fetching location details: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/host/add-property', { state: { ...location.state, location: propertyLocation, stage: 6 } });
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className='p-8 bg-white shadow-md rounded-lg'>
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Location Information</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Address:</label>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search for an address"
            className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          {status === "OK" && (
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
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">District:</label>
            <input
              type="text"
              name="district"
              value={propertyLocation.district}
              onChange={handleLocationChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Province:</label>
            <input
              type="text"
              name="province"
              value={propertyLocation.province}
              onChange={handleLocationChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Latitude:</label>
            <input
              type="number"
              name="latitude"
              value={propertyLocation.latitude}
              onChange={handleLocationChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Longitude:</label>
            <input
              type="number"
              name="longitude"
              value={propertyLocation.longitude}
              onChange={handleLocationChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 mb-2">Zip Code:</label>
            <input
              type="text"
              name="zipcode"
              value={propertyLocation.zipcode}
              onChange={handleLocationChange}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="my-8">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={{
            lat: propertyLocation.latitude || defaultCenter.lat,
            lng: propertyLocation.longitude || defaultCenter.lng,
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
      <button type="submit" className="w-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700" > Save Location </button>
        
      </form>
      
      {googleResponse && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(googleResponse, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AddLocation;
