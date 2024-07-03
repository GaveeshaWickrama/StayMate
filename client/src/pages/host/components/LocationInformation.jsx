import React from 'react';
import addLocationImage from '../../../assets/location.jpg';

const LocationInformation = ({ property, navigate }) => {
  const location = property.location;

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Location Information</h2>
      {location.address ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">Address:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.address}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Latitude:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.latitude}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Longitude:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.longitude}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">District:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.district}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Province:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.province}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Zip Code:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.zipcode}
            </p>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Geocoding Response:</label>
            <pre className="block w-full p-2 border border-gray-300 rounded bg-gray-100">
              {JSON.stringify(location.geocoding_response, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={addLocationImage} alt="Add Location" className="mb-4" />
          <button
            type="button"
            onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
            className="bg-black text-white px-10 py-4 rounded mt-4 "
          >
            Add Location
          </button>
        </div>
      )}
      {location.address && (
        <button
          type="button"
          onClick={() => navigate('/host/add-location', { state: { ...property, location: location, stage: 4 } })}
          className="bg-black text-white px-4 py-2 rounded mt-4"
        >
          Change Location
        </button>
      )}
    </div>
  );
};

export default LocationInformation;

