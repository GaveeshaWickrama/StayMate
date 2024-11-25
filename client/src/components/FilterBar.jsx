import React, { useState, useEffect } from 'react';
import { FaBuilding, FaDollarSign, FaBed } from 'react-icons/fa';

const FilterBar = ({ onFilterChange, onFilterSubmit, onFilterReset }) => {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    onFilterChange(name, value); // Update parent’s filter state
  };

  const handleFilterSubmit = () => {
    onFilterSubmit();
  };

  const handleResetFilters = () => {
    setFilters({ type: '', minPrice: '', maxPrice: '', bedrooms: '' });
    onFilterReset();
  };

  const iconStyle = "text-blue-500 mr-4 mt-6 text-xl";

  return (
    <div className="flex flex-wrap items-center p-4 bg-gray-100 shadow-md rounded-md mb-4">
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaBuilding className={iconStyle} />
        <div>
          <label className="block text-gray-700">Type:</label>
          <select name="type" value={filters.type} onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto">
            <option value="">All</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Cabin">Cabin</option>
          </select>
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaDollarSign className={iconStyle} />
        <div>
          <label className="block text-gray-700">Min Price:</label>
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto" />
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaDollarSign className={iconStyle} />
        <div>
          <label className="block text-gray-700">Max Price:</label>
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto" />
        </div>
      </div>
      <div className="mr-4 mb-4 w-full sm:w-auto flex items-center">
        <FaBed className={iconStyle} />
        <div>
          <label className="block text-gray-700">Bedrooms:</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="p-2 border rounded w-full sm:w-auto">
            <option value="">Any</option>
            {/* <option value="1">1+</option> */}
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
      <div className="w-full sm:w-auto flex items-center justify-center mt-3 px-2">
        <button 
          onClick={handleFilterSubmit} 
          className="p-2 px-8 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Filter
        </button>
        <button 
          onClick={handleResetFilters} 
          className="p-2 px-8 bg-gray-400 text-white rounded shadow hover:bg-gray-500 transition duration-300 ml-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
