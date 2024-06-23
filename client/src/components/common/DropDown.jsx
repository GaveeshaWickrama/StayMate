import React from 'react';

const DropDown = ({ categories }) => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 md:px-20 lg:px-40 mt-11">
      <label htmlFor="category" className="text-gray-600 font-bold text-xl md:text-2xl">Category</label>
      <select id="category" className="p-2 border rounded-lg bg-blue-500 text-white shadow-md focus:outline-none focus:ring focus:border-blue-500">
        <option value="None" disabled >Select a Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

