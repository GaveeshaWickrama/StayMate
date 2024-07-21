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
      return <div>Complaint not found</div>;
    }
  
const handleFindTechnician = ({complaint}) => {
  alert("directing t technician explore page");
  navigate(`/technician/all`);
};
  return (
//     <div className='bg-gray-100 mx-auto py-2 px-8'>
     

// <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'> 
//       </div>

// <div className='bg-sky-100 pl-10 pt-5 h-screen'>
//       <div className='text-lg font-bold mb-10'>{complaint.title}</div>
//     <div className='flex flex-col gap-5 flex-grow'>
//     <div>{complaint.description}</div>
//       <div>{complaint.category}</div>
//       <div className='flex flex-row'>
//         <span>Posted By</span> 
//         <div className='flex flex-row '>
//         <span>User1</span> <div className='h-10 w-10 rounded-full bg-yellow-100'></div>

//         </div>
//       </div>
//       <div>Goldren Rose</div>
//       <div>Images</div>
//     </div>



//         <button onClick={()=>handleFindTechnician(id)} className='font-semibold text-white text-sm px-10 py-2 rounded-xl bg-red-500 border border-red-500 rounded ml-[100px] mt-[50px]'>assign to a technician</button>
//         <button className='font-semibold text-white text-sm px-10 py-2 bg-blue-950 rounded-xl ml-[100px] mt-[50px]'>mark as resolved</button>
//         </div>

//     </div>


<div className="bg-gray-100 mx-auto py-2 px-8">
<div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
  <h1 className="flex items-center text-4xl font-extrabold text-black-600">
     {complaint.title}
  </h1>
  <div className="flex items-center text-gray-600 ml-6 mt-3">
    <span>Posted By : User1</span>
  </div>
</div>

<div className="bg-white rounded-lg overflow-hidden mb-4">
  {/* <Carousel images="" /> */}
</div>

<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
    <div className="bg-white p-8 flex items-center border-b">
    <h2 className="text-xl font-bold">Rating: </h2>
      <p className='ml-4'>No reviews yet.</p>

    </div>
    <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
      <MdOutlineMeetingRoom className='text-blue-500' /><p>room No 4</p>
      
    </div>
    <div className="bg-white p-8 flex items-center">
      
      <FaMapMarkerAlt className="mr-2" />
      <p className="font-semibold">UCSC Reid Avenue Colombo 7</p>
    </div>
  </div>

  <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-2">Hosted By </h2>
   <div >Muralitharan</div>
   <div className='flex flex-row items-center mt-5'><h2 className="text-l font-bold mb-2">Posted On: </h2> <FaClock className="mr-2 ml-2" /> 2023-05-04</div>
    
   
   
  </div>
</div>

<div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
  <h2 className="text-xl font-bold mb-2">Description</h2>
  <p className='text-lg'>{complaint.description}</p>
</div>

<div>
<button onClick={()=>handleFindTechnician(id)} className='bg-blue-600 text-white p-4 rounded font-bold w-50 my-10'>assign to a technician</button>
<button className='bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4'>mark as resolved</button>

</div>

</div>






  )
}
