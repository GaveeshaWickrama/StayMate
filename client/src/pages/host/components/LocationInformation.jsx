import React, { useState } from 'react';
import addLocationImage from '../../../assets/location.jpg';

const LocationInformation = ({ property, navigate }) => {
  const [showGeocodingResponse, setShowGeocodingResponse] = useState(false);
  const location = property.location;

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">
        Location Information
      </h2>
      {location.address ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Address:</label>
            <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              {location.address}
            </p>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-600 font-semibold mb-1">District:</label>
              <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                {location.district}
              </p>
            </div>
            <div className="flex-1">
              <label className="block text-gray-600 font-semibold mb-1">Province:</label>
              <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                {location.province}
              </p>
            </div>
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-600 font-semibold mb-1">Latitude:</label>
              <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                {location.latitude}
              </p>
            </div>
            <div className="flex-1">
              <label className="block text-gray-600 font-semibold mb-1">Longitude:</label>
              <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                {location.longitude}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-1">Zip Code:</label>
            <p className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
              {location.zipcode}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowGeocodingResponse(!showGeocodingResponse)}
            className="text-blue-500 underline mt-4"
          >
            {showGeocodingResponse ? 'Hide Geocoding Response' : 'Show Geocoding Response'}
          </button>
          {showGeocodingResponse && (
            <div className="mt-4">
              <label className="block text-gray-600 font-semibold mb-1">Geocoding Response:</label>
              <pre className="block w-full p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-x-auto">
                {JSON.stringify(location.geocoding_response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white p-2 rounded-lg mb-40">
          <img src={addLocationImage} alt="Add Location" className="w-1/4" />
          <button
            type="button"
            onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
            className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
          >
            Add Location
          </button>
        </div>
      )}
      {location.address && (
        <button
          type="button"
          onClick={() => navigate('/host/add-location', { state: { ...property, location: location, stage: 4 } })}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-8 hover:bg-blue-700 focus:outline-none focus:bg-blue-800"
        >
          Change Location
        </button>
      )}
    </div>
  );
};

export default LocationInformation;
