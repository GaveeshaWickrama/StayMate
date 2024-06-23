import React from 'react';

const PropertyDetailsSection = ({ property, handleChange }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Property Details - Part 2</h2>
    <div className="mb-4">
      <label className="block mb-1">Is this an entire place or a partition?</label>
      <select
        name="total_unique_sections"
        value={property.total_unique_sections}
        onChange={handleChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      >
        <option value="1">Entire Place</option>
        <option value="0">Partition</option>
      </select>
    </div>
  </div>
);

export default PropertyDetailsSection;
