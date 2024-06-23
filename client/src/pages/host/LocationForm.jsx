import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LocationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locationDetails, setLocationDetails] = useState(location.state?.location || {
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
    setLocationDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/host/add-property', { state: { ...location.state, location: locationDetails, stage: 4 } });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Location Information</h2>
      <div className="mb-4">
        <label className="block mb-1">Address:</label>
        <input
          type="text"
          name="address"
          value={locationDetails.address}
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
          value={locationDetails.latitude}
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
          value={locationDetails.longitude}
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
          value={locationDetails.city}
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
          value={locationDetails.district}
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
          value={locationDetails.province}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Zipcode:</label>
        <input
          type="text"
          name="zipcode"
          value={locationDetails.zipcode}
          onChange={handleLocationChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </form>
  );
};

export default LocationForm;

