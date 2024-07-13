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
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/${id}`);
          setComplaint(response.data);
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
        <h1 className="flex items-center text-4xl font-extrabold text-black-600"> <FaHome className="mr-4" /> {/* House icon */} {complaint.title} </h1>
      </div>
      <div>{complaint.description}</div>

        <button onClick={()=>handleFindTechnician(id)}>assign to a technician</button>
        <button>mark as resolved</button>
    </div>
  )
}
