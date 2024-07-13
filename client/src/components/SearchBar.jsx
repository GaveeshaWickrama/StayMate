// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [radius, setRadius] = useState('');

  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const customDatePickerStyles = `
    .custom-datepicker input {
      width: 100%;
      padding: 0;
      border: none;
      outline: none;
      font-size: 0.875rem; /* Equivalent to text-sm */
      color: #6b7280; /* Equivalent to text-gray-500 */
    }
    .custom-datepicker input::placeholder {
      color: #9ca3af; /* Equivalent to placeholder text color */
    }
  `;

  return (
    <>
      <style>{customDatePickerStyles}</style>
      <div className="flex items-center justify-between bg-white shadow-md rounded-full px-4 py-2 w-full max-w-4xl mx-auto mb-8 border">
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            className="outline-none text-gray-500 text-sm"
          />
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Radius</label>
          <input
            type="number"
            value={radius}
            onChange={handleRadiusChange}
            placeholder="Enter radius (km)"
            className="outline-none text-gray-500 text-sm"
          />
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Check in</label>
          <div className="custom-datepicker w-full">
            <input
              type="date"
              value={checkInDate}
              onChange={handleCheckInChange}
              placeholder="Add dates"
              className="w-full"
            />
          </div>
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Check out</label>
          <div className="custom-datepicker w-full">
            <input
              type="date"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              placeholder="Add dates"
              className="w-full"
            />
          </div>
        </div>
     
        <button className="bg-blue-500 text-white rounded-full p-3 ml-4">
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default SearchBar;



