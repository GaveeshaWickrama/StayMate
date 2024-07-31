import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

const PopupForm = ({ isOpen, handleClose , complaintId, hostID }) => {
  if (!isOpen) return null;


  const [resolveComments, setResolveComments] = useState('');

  const navigate = useNavigate();

  const resolve = async (complaintId, resolveComments) => {
    try {
      console.log(`Complaint ID: ${complaintId}`);
      // console.log(`Host ID: ${hostID}`);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/resolve-complaint/${complaintId}`,
        { resolveComments }, // Include the additional info in the request body

        { params: { complaintId } }
      );

      navigate('/host/manage-complaints');
      alert("Request successfully sent!");
    } catch (error) {
      console.error("Request couldn't be sent to the technician", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await resolve(complaintId, resolveComments);
    handleClose();
    navigate("/host/manage-complaints");
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Mark Complaint as Resolved</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-3">Additional Remarks</label>
            <textarea
              className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required placeholder='Write a comment for the user'
              value = {resolveComments}
              onChange={(e) => setResolveComments(e.target.value)}

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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
