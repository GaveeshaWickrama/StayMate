import React from 'react';

const InputField = ({label,placeholder}) => {
  return (
    <div className="my-4 px-4 sm:px-10 md:px-20 lg:px-40 mt-11">
      <label htmlFor="title" className="block text-gray-600 font-bold text-2xl mb-2">{label}</label>
      <input type="text" id="title" className="p-2 w-full border rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-500" placeholder={placeholder} />
    </div>
  );
};

export default InputField;
