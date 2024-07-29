import React from 'react';
import { FaBuilding, FaDollarSign, FaBed, FaBath } from 'react-icons/fa';

const FilterBar = ({ onFilterChange, onFilterSubmit }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const iconStyle = "text-blue-500 mr-4 mt-6 text-xl"; // Add custom styling here

  return (
    <div className="flex flex-wrap items-center p-4 bg-gray-100 shadow-md rounded-md mb-4">
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaBuilding className={iconStyle} />
        <div>
          <label className="block text-gray-700">Type:</label>
          <select name="type" onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto">
            <option value="">All</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="work">Work</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaDollarSign className={iconStyle} />
        <div>
          <label className="block text-gray-700">Min Price:</label>
          <input type="number" name="minPrice" onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto" />
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaDollarSign className={iconStyle} />
        <div>
          <label className="block text-gray-700">Max Price:</label>
          <input type="number" name="maxPrice" onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto" />
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaBed className={iconStyle} />
        <div>
          <label className="block text-gray-700">Bedrooms:</label>
          <select name="bedrooms" onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaBath className={iconStyle} />
        <div>
          <label className="block text-gray-700">Bathrooms:</label>
          <select name="bathrooms" onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <div className="w-full sm:w-auto flex items-center justify-center mt-3 px-2">
        <button 
          onClick={onFilterSubmit} 
          className="p-2 px-8 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
