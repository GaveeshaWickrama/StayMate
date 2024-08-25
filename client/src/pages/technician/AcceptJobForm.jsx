import React, { useState } from 'react';

const PopupForm = ({ isOpen, handleClose, handleSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Accept Job </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-3">Please estimate the payment you would be charging for the job</label>
           
            <input type="text"
            className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"

            required placeholder='LKR 3000'
             />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
