import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from "../../context/auth";

function HandleSendRequest({ complaintId, technicianID, hostID }) {
  const navigate = useNavigate();

  const sendRequest = async (complaintId, technicianID, hostID) => {
    try {
      console.log(`Complaint ID: ${complaintId}`);
      console.log(`Technician ID: ${technicianID}`);
      console.log(`Host ID: ${hostID}`);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/assign-complaint/${technicianID}`,
        null,
        { params: { complaintId, hostID } }
      );

      navigate('/host/manage-complaints');
      alert("Request successfully sent!");
    } catch (error) {
      console.error("Request couldn't be sent to the technician", error);
    }
  };

  const handleButtonClick = () => {
    sendRequest(complaintId, technicianID, hostID);
  };

  return (
    <div>
      <button className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4" onClick={handleButtonClick}>
        Send Request
      </button>
    </div>
  );
}

function TechnicianDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const complaintID = queryParams.get('complaintID');
  const hostID = currentUser.id;
  const [technician, setTechnician] = useState(null);

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
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <div>
          <img src={`../../assets/${technician.proPic}`} alt="Technician" className="w-10 h-10 rounded-full mx-2" />
        </div>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          {technician.userDetails.firstName} {technician.userDetails.lastName}
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          <FaClock className="mr-2" /> <span>Added on: {new Date(technician.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4"></div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex flex-col text-xl gap-4 border-b">
            <h2 className="text-xl font-bold mb-2">About</h2>
            <p className='text-lg'>{technician.about}</p>
          </div>
          <div className="bg-white p-8 flex items-center border-b">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">{technician.location.address}</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <div>
            <h2 className="text-xl font-bold mb-2">Date Joined</h2>
            <div>{new Date(technician.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Jobs done</h2>
            <div>7</div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Rating: 4.5</h2>
            <p className='ml-4'>Great!</p>
          </div>
        </div>
      </div>

      <div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        <p className='text-lg'>Reviews come here</p>
      </div>
      <HandleSendRequest complaintId={complaintID} technicianID={id} hostID={hostID} />
    </div>
  );
}

export default TechnicianDetails;
