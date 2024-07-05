import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import { FaHome, FaClock, FaMapMarkerAlt, FaCity, FaBuilding, FaMapPin, FaEnvelope } from 'react-icons/fa';

function TechnicianDetails() {
  const { id } = useParams();
  const [technician, setTechnician] = useState(null);

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technician/${id}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician:', error);
      }
    };

    fetchtechnician();
  }, [id]);

  if (!technician) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-gray-200 mx-auto p-6">
      <div className='flex mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'> 
        <h1 className="flex items-center text-4xl font-extrabold text-black-600"> <FaHome className="mr-4" /> {/* House icon */} {technician.firstName} </h1>
        
      </div>
      
  
      {/* <div className="bg-white rounded-lg overflow-hidden mb-8">
        <Carousel images={technician.images.map(img => ({ url: `${import.meta.env.VITE_API_URL}/${img.url}` }))} />
      </div> */}

      <div className='flex space-x-8'>
        <div className="w-2/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8 ">
          <h2 className="flex items-center text-2xl font-bold mb-4"> <FaMapPin className="mr-2 text-gray-600" />  Address Details</h2>
          <div className=""> <span>{technician.location}</span> </div>
         
          
        </div>
        
      </div>

    </div>
  );
}

export default TechnicianDetails;


