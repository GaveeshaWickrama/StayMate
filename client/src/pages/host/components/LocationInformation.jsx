import React from 'react';

const LocationInformation = ({ property, handleChange, navigate }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Location Information</h2>
    <div>
      <label className="block mb-1">Address:</label>
      <input
        type="text"
        name="address"
        value={property.location.address}
        onChange={(e) => handleChange({ target: { name: 'location.address', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Latitude:</label>
      <input
        type="number"
        name="latitude"
        value={property.location.latitude}
        onChange={(e) => handleChange({ target: { name: 'location.latitude', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Longitude:</label>
      <input
        type="number"
        name="longitude"
        value={property.location.longitude}
        onChange={(e) => handleChange({ target: { name: 'location.longitude', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">City:</label>
      <input
        type="text"
        name="city"
        value={property.location.city}
        onChange={(e) => handleChange({ target: { name: 'location.city', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">District:</label>
      <input
        type="text"
        name="district"
        value={property.location.district}
        onChange={(e) => handleChange({ target: { name: 'location.district', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Province:</label>
      <input
        type="text"
        name="province"
        value={property.location.province}
        onChange={(e) => handleChange({ target: { name: 'location.province', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Zip Code:</label>
      <input
        type="text"
        name="zipcode"
        value={property.location.zipcode}
        onChange={(e) => handleChange({ target: { name: 'location.zipcode', value: e.target.value } })}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <button
      type="button"
      onClick={() => navigate('/host/add-location', { state: { ...property, stage: 4 } })}
      className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
    >
      Change Location
    </button>
  </div>
);

export default LocationInformation;
