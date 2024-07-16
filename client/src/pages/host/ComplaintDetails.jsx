import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { FaHome, FaClock, FaMapMarkerAlt, FaEnvelope , FaShower  } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill  } from "react-icons/go";

export default function ComplaintDetails() {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
      const fetchComplaint = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`);
          console.log(`${import.meta.env.VITE_API_URL}/complaints/${id}`);
          setComplaint(response.data);
          console.log('this is the response data', complaint);
        } catch (error) {
          console.error('Error fetching complaint:', error);
        }
      };
  
      fetchComplaint();
    }, [id]);
    console.log(complaint);
    if (!complaint) {
      return <div>Loading...</div>;
    }
  
const handleFindTechnician = ({complaint}) => {
  alert("directing t technician explore page");
  navigate(`/technician/all`);
};
  return (
    <div className='bg-gray-100 mx-auto py-2 px-8'>
     

<div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'> 
      </div>

<div className='bg-sky-100 pl-10 pt-5 h-screen'>
      <div className='text-lg font-bold mb-10'>{complaint.title}</div>
    <div className='flex flex-col gap-5 flex-grow'>
    <div>{complaint.description}</div>
      <div>{complaint.category}</div>
      <div className='flex flex-row'>
        <span>Posted By</span> 
        <div className='flex flex-row '>
        <span>User1</span> <div className='h-10 w-10 rounded-full bg-yellow-100'></div>

        </div>
      </div>
      <div>Goldren Rose</div>
      <div>Images</div>
    </div>



        <button onClick={()=>handleFindTechnician(id)} className='font-semibold text-white text-sm px-10 py-2 rounded-xl bg-red-500 border border-red-500 rounded ml-[100px] mt-[50px]'>assign to a technician</button>
        <button className='font-semibold text-white text-sm px-10 py-2 bg-blue-950 rounded-xl ml-[100px] mt-[50px]'>mark as resolved</button>
        </div>

    </div>
  )
}
