import React, { useState, useEffect } from 'react';
import axios from 'axios'

const PopupForm = ({ isOpen, handleClose, handleSave, complaintId}) => {
  if (!isOpen) return null;

  const uploadProof = async (complaintId) => {
    try {
      console.log(`Complaint ID received in the upload proof: ${complaintId}`);
      // console.log(`Host ID: ${hostID}`);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/complaint/${complaintId}/uploadProof`,


      
        { images, additionalRemarks }, // Include the additional info in the request body

        { params: { complaintId } }
      );

      navigate('/technician/tasks');
      alert("proof uploaded successfully!");
    } catch (error) {
      console.error("proof couldne be uploaded", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Please Upload proof of the task you have completed </h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-3">Upload proof of the job completed</label>
           <input type="file" />
         value ={images}
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-3">Additional Remarks</label>
            <textarea
              className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder='Please add any any additional remarks about the job'
              required
              value={additionalRemarks}
            ></textarea>
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
