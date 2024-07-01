import React from 'react';

const PropertyDetails = ({ property, handleChange }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Property Basic Details</h2>
    <div className="mb-4">
      <label className="block mb-1">Title:</label>
      <input
        type="text"
        name="title"
        value={property.title}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Description:</label>
      <textarea
        name="description"
        value={property.description}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Property Type:</label>
      <select
        name="type"
        value={property.type}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
      >
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Villa">Villa</option>
        <option value="Cottage">Cottage</option>
        <option value="Cabin">Cabin</option>
        <option value="Hotel">Hotel</option>
      </select>
    </div>
  </div>
);

export default PropertyDetails;

