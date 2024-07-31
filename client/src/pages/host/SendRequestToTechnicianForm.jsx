import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

const PopupForm = ({
  isOpen,
  handleClose,
  complaintId,
  technicianID,
  hostID,
}) => {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  const sendRequest = async (
    complaintId,
    technicianID,
    hostID,
    additionalInfo
  ) => {
    try {
      console.log(`Complaint ID: ${complaintId}`);
      console.log(`Technician ID: ${technicianID}`);
      console.log(`Host ID: ${hostID}`);
      console.log(`additional info: ${additionalInfo}`);

      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/complaints/assign-complaint/${technicianID}`,
        { additionalInfo }, // Include the additional info in the request body

        { params: { complaintId, hostID } }
      );

      navigate("/host/manage-complaints");
      alert("Request successfully sent!");
    } catch (error) {
      console.error("Request couldn't be sent to the technician", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await sendRequest(complaintId, technicianID, hostID, additionalInfo);
    handleClose();
    navigate("/host/manage-complaints");
  };

  // return (
  //   <div>
  //     <button className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4" onClick={handleButtonClick}>
  //       Send Request
  //     </button>
  //   </div>
  // );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Send Request To Technician</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 py-5">
              Additional Information
            </label>

            <textarea
              className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Please add any additional information you want to inform the technician about the Job"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            ></textarea>

            <label className="block text-lg font-medium text-gray-700 py-5">
Deadline            </label>
<p className="text-sm">Please enter a deadline</p>
            <input
              type="text"
              className="rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="20224-08-12"
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PopupForm;
