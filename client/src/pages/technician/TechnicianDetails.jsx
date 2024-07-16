import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaMapPin } from 'react-icons/fa';

function HandleSendRequest({ complaintId, technicianID, navigate }) {
  const sendRequest = async (complaintId, technicianID) => {
    try {
      console.log("complaint id is received in the send requet function", complaintId);
      // await axios.post(`${import.meta.env.VITE_API_URL}/complaints/assign-complaint/${technicianID}`, { complaintID });
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints/assign-complaint/${technicianID}`,{
        complaintId: complaintId

      });
      navigate('/host/manage-complaints');
      alert("Request successfully sent!");
    } catch (error) {
      console.error("Request couldn't be sent to the technician", error);
    }
  };

  const handleButtonClick = () => {
    console.log("handleButtonClick");
    console.log(complaintId,technicianID);
    sendRequest(complaintId, technicianID);
  };

  return (
    <div>
      <button className="font-semibold text-white text-sm px-10 py-2 bg-blue-950 rounded-xl ml-[150px] mt-[50px]" onClick={handleButtonClick}>Send Request</button>
    </div>
  );
}

function TechnicianDetails() {
  const { id } = useParams();
  // const location = useLocation();
  // const { complaintID } = location.state;
  const {complaintId, setComplaintId}  = useState('');
  const [technician, setTechnician] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${id}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician:', error);
      }
    };

    fetchTechnician();
  }, [id]);

  if (!technician) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-gray-200 mx-auto p-6">
      <div className='flex mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaHome className="mr-4" />
          {technician.firstName}
        </h1>
      </div>
      <div className='flex space-x-8'>
        <div className="w-2/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8">
          <h2 className="flex items-center text-2xl font-bold mb-4">
            <FaMapPin className="mr-2 text-gray-600" />
            Address Details
          </h2>
          <div><span>{technician.location}</span></div>
        </div>
      </div>
      <HandleSendRequest complaintId='66823d0abbcb757d9c5668e9' technicianID={id} navigate />
    </div>
  );
}

export default TechnicianDetails;
