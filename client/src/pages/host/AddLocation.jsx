import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [propertyLocation, setPropertyLocation] = useState(location.state?.location || {
    address: '',
    latitude: 0,
    longitude: 0,
    city: '',
    district: '',
    province: '',
    zipcode: ''
  });

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setPropertyLocation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/host/add-property', { state: { ...location.state, location: propertyLocation, stage: 4 } });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Location Information</h2>
      <div className="mb-4">
        <label className="block mb-1">Address:</label>
        <input
          type="text"
          name="address"
          value={propertyLocation.address}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Latitude:</label>
        <input
          type="number"
          name="latitude"
          value={propertyLocation.latitude}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Longitude:</label>
        <input
          type="number"
          name="longitude"
          value={propertyLocation.longitude}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">City:</label>
        <input
          type="text"
          name="city"
          value={propertyLocation.city}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">District:</label>
        <input
          type="text"
          name="district"
          value={propertyLocation.district}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Province:</label>
        <input
          type="text"
          name="province"
          value={propertyLocation.province}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Zip Code:</label>
        <input
          type="text"
          name="zipcode"
          value={propertyLocation.zipcode}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Location
      </button>
    </form>
  );
};

export default AddLocation;
