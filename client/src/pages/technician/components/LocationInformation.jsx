import React from 'react';

const LocationInformation = ({ property, navigate }) => {
  const location = property.location;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Location Information</h2>
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
            <label className="block mb-1">City:</label>
            <p className="block w-full p-2 border border-gray-300 rounded">
              {location.city}
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
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src="https://via.placeholder.com/150" alt="Add Location" className="mb-4" />
          <p className="text-gray-600 mb-4">--something here--.</p>
          <button
            type="button"
            onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
          >
            Add Location
          </button>
        </div>
      )}
      {location.address && (
        <button
          type="button"
          onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        >
          Change Location
        </button>
      )}
    </div>
  );
};

export default LocationInformation;


