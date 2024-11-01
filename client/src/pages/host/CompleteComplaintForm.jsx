import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import ActiveComplaintDetails from './components/ActiveComplaintDetails';
const PopupForm = ({ isOpen, handleClose , complaint }) => {
  if (!isOpen) return null;


    const status = complaint.status;
  const navigate = useNavigate();

  const resolve = async (complaint) => {
    try {
      console.log(`Complaint ID: ${complaint._id}`);
      // console.log(`Host ID: ${hostID}`);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/resolve-complaint/${complaint._id}`,
        {},
  { params: { complaintId: complaint._id } }
      );

      navigate('/host/manage-complaints');
      alert("Job successsfully closed!!");
    } catch (error) {
      console.error("job coudnt be saved", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await resolve(complaint);
  
    navigate("/host/manage-complaints");
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Mark Complaint as Completed</h2>
        <form onSubmit={handleSave}>
         
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
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
