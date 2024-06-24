import React from 'react';

const DescriptionInput = ({label,placeholder}) => {
  return (
    <div className="my-4 px-4 sm:px-10 md:px-20 lg:px-40 mt-11">
      <h2><label htmlFor="description" className="block text-gray-600 font-bold text-2xl mb-2">{label}</label></h2>
      <textarea id="description" className="p-2 w-full h-32 border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500" placeholder={placeholder}></textarea>
    </div>
  );
};

export default DescriptionInput;
