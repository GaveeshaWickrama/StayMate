// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchProperty = () => {
//   const [district, setDistrict] = useState('');
//   const [province, setProvince] = useState('');
//   const [host, setHost] = useState('');

//   const handleDistrictChange = (event) => {
//     setDistrict(event.target.value);
//   };

//   const handleProvinceChange = (event) => {
//     setProvince(event.target.value);
//   };

//   const handleHostChange = (event) => {
//     setHost(event.target.value);
//   };

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
          <label className="text-xs font-bold text-gray-700">Province</label>
          <input
            type="text"
            placeholder="Search Province"
            className="outline-none text-gray-500 text-sm"
          />
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Host</label>
          <input
            type="text"
            // value={host}
            // onChange={handleHostChange}
            placeholder="Host's First/Last name"
            className="outline-none text-gray-500 text-sm"
          />
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">District</label>
          <div className="custom-datepicker w-full">
            <input
              type="text"
            //   value={district}
            //   onChange={handleCheckInChange}
              placeholder="Search District"
              className="w-full"
            />
          </div>
        </div>
        <div className="border-l h-8 mx-4 border-blue-500"></div>
        <div className="flex flex-col items-start flex-grow">
          <label className="text-xs font-bold text-gray-700">Date Listed</label>
          <div className="custom-datepicker w-full">
            <input
              type="date"
            //   value={province}
            //   onChange={handleCheckOutChange}
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

export default SearchProperty;



