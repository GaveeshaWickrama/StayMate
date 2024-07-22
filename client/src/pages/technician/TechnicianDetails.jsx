import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaMapPin, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";


function HandleSendRequest({ complaintId, technicianID }) {
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
    // <div className="container bg-gray-200 mx-auto p-6">
    //   <div className='flex mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
    //     <h1 className="flex items-center text-4xl font-extrabold text-black-600">
    //       <FaHome className="mr-4" />
    //       {technician.firstName}
    //     </h1>
    //   </div>
    //   <div className='flex space-x-8'>
    //     <div className="w-2/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8">
    //       <h2 className="flex items-center text-2xl font-bold mb-4">
    //         <FaMapPin className="mr-2 text-gray-600" />
    //         Address Details
    //       </h2>
    //       <div><span>{technician.location}</span></div>
    //     </div>
    //   </div>
    //   <HandleSendRequest complaintId='66823d0abbcb757d9c5668e9' technicianID={id} navigate />
    // </div>


    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>

      <div>
        <img src="data:image/jpeg;base64,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" 
        alt="Host" className="w-10 h-10 rounded-full mx-2" />

        </div>

        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          {technician.firstName} {technician.lastName}
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          <FaClock className="mr-2" /> <span>Added on: date</span>
        </div>
        
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">

      
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
        
          
          <div className="bg-white p-8 flex flex-col  text-xl gap-4 border-b">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className='text-lg'>{technician.about}</p>
          </div>

          <div className="bg-white p-8 flex items-center">
           
            
          </div>
          <div className="bg-white p-8 flex items-center border-b">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">{technician.location}</p>
          </div>

        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Date Joined</h2>
         <div>2022-05-02</div>
          <h2 className="text-xl font-bold mb-2">Jobs done</h2>
         <div>7</div>

         <h2 className="text-xl font-bold">Rating: 4.5</h2>
         <p className='ml-4'>great!</p>
        </div>
       
      </div>

      <div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        <p className='text-lg'>reviews come here</p>
      </div>
     <HandleSendRequest complaintId='66823d0abbcb757d9c5668e9' technicianID={id}  />

     
    </div>

    









  );
}

export default TechnicianDetails;
