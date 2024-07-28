import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { FaHome, FaClock, FaMapMarkerAlt, FaEnvelope , FaShower  } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill  } from "react-icons/go";
import ActiveComplaintDetails from './components/ActiveComplaintDetails';
import PendingComplaintDetails from './components/PendingComplaintDetails';

export default function ComplaintDetails(props) {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
      const fetchComplaint = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`);
          console.log(`${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`);
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
  

  return (



<div className="bg-gray-100 mx-auto py-2 px-8">
<div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
  <div className='flex flex-row justify-between'>
  <h1 className="flex items-center text-4xl font-extrabold text-black-600">
     {complaint.title}
  </h1>
  <p className='bg-blue-300 p-4 rounded-lg text-white'>{complaint.category}</p>
  </div>
  

  <div className="flex items-center text-gray-600 ml-6 mt-3">
    <span>Posted By : {complaint.reservationId.user.firstName}  {complaint.reservationId.user.lastName}</span>
  </div>
</div>

<div className="bg-white rounded-lg overflow-hidden mb-4">
  {/* <Carousel images="" /> */}
</div>

<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
    <div className="bg-white p-8 flex items-center border-b">
      <div></div>
    <h2 className="text-xl font-bold">status:  </h2>
      <p className='ml-4 badge badge-ghost'>{complaint.status}</p>

    </div>
    <div className="bg-white p-8 flex items-center text-xl gap-9  border-b">
     <p className='text-lg'>room No 4</p>
     <p className='text-lg'>Checked In : {complaint.reservationId.checkInDate}</p>
     <p className='text-lg'>Check Out Date : {complaint.reservationId.checkOutDate}</p>
     <p className='text-lg'>Property : {complaint.reservationId.property.title}</p>
      
    </div>
    <div className="bg-white p-8 flex items-center border-b">
      
      <FaMapMarkerAlt className="mr-2" />
      <p className="font-semibold">{complaint.reservationId.property.location.address}</p>
    </div>
    <div className="bg-white p-8 flex flex-col">
      
     
      <h2 className="text-xl font-bold pb-2">Images  </h2>
      <p className="flex flex-row gap-3 flex-wrap">
      {complaint.images && complaint.images.map((image, index) => (
    <img key={index} src={`${import.meta.env.VITE_API_URL}/${image}`} alt={`Complaint Image ${index + 1}`} className="mt-2 w-13 h-13" />
  ))}
      </p>
    </div>
  </div>

  <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-2">Hosted By </h2>
   <div >{complaint.reservationId.property.host_id.firstName} {complaint.reservationId.property.host_id.lastName}</div>
   <div className='flex flex-row items-center mt-5'><h2 className="text-l font-bold mb-2">Posted On: </h2> <FaClock className="mr-2 ml-2" /> 2023-05-04</div>
   


   
   
  </div>
</div>

<div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
  <h2 className="text-xl font-bold mb-2">Description</h2>
  <p className='text-lg'>{complaint.description}</p>
</div>

<div>
        {complaint.status === 'active' ? (
          <ActiveComplaintDetails complaint={complaint} id={id}>
            {props.children}
          </ActiveComplaintDetails>
        ) : complaint.status === 'pendingHostDecision' ?  (
          <PendingComplaintDetails complaint={complaint} id={id}>
            {props.children}
          </PendingComplaintDetails>
        ) :  (
          <PendingComplaintDetails complaint={complaint} id={id}>
            {props.children}
          </PendingComplaintDetails>
        )}
      </div>

</div>






  )
}
