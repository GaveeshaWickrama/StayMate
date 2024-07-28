import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaMapPin, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import { format } from 'date-fns';
import { useAuth } from "../../context/auth";


export default function  PendingComplaints() {

  const { currentUser, loading } = useAuth();


    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    const hostID = currentUser.id


    const handleStatusChange = (id, newStatus) => {
      // Handle status change (e.g., update state or make API call)
      console.log(`Change status of complaint ${id} to ${newStatus}`);
    };

    useEffect(()=>{

    
             const fetchComplaints = async () => {
               console.log("inside the fetchcomplaint");
               console.log(import.meta.env.VITE_API_URL);
       
       
               try{
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/${hostID}/pending/host`);
                 console.log("Response from backend:", response.data); // Log the actual data
       
                 setComplaints(Array.isArray(response.data) ? response.data : []);

                 console.log(complaints)
               }
               catch(error){
                 console.error("Error fetching complaints:", error); 
               
               }
                 
         };
       
       fetchComplaints();
       
       
           },[hostID]);

    
           const handleRowClick = (complaintId) => {
            alert(complaintId);
            navigate(`/host/complaint-details/${complaintId}`);
          };

          const [isExpanded, setIsExpanded] = useState(false);

          const handleToggle = (event) => {
            console.log(event)
            event.stopPropagation();
            setIsExpanded(!isExpanded);
          };

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
           Complaints
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="w-full">

        <div className='flex flex-row gap-10'>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/host/manage-complaints/" ><span>All</span></a> </div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'><a href="/host/manage-complaints/pending" > <span className='text-blue-500 underline hover:underline-offset-4 hover:decoration-wavy transition-all duration-300'>Pending</span></a></div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/host/manage-complaints/active" >Active</a> </div>

        </div>
        <div className="w-full  rounded-lg p-1 bg-white shadow">
          
        <div className="overflow-x-auto w-full">
  <table className="table auto w-full">
    {/* head */}
    <thead>
      <tr className='text-blue-800'>
        <th></th>
        <th>Property Address</th>
        <th>Issue Reported</th>
        <th>Date reported</th>
        <th>Assigned Technician</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     

      {complaints.map((complaint, index) => {
        const formattedDate = format(new Date(complaint.timestamp), 'yyyy-MM-dd');
        return(
            <tr key={complaint._id} className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handleRowClick(complaint._id)}  >
            
            
              <th className='text-center'>{index+1}</th>
              <td className='text-center'>{complaint.category}</td>
              <td className='text-center'>
              {complaint.title} :
        {isExpanded ? (
          <div>
            {complaint.description}
            <button 
              onClick={handleToggle} 
              className='text-blue-500 ml-2'>
              Read Less
            </button>
          </div>
        ) : (
          <div>
            {complaint.description.length > 100 
              ? `${complaint.description.substring(0, 200)}...` 
              : complaint.description}
            {complaint.description.length > 100 && (
              <button 
                onClick={handleToggle} 
                className='text-blue-500 ml-2'>
                Read More
              </button>
            )}
          </div>
        )}
              </td>
              <td className='text-center'>{formattedDate}</td>
              <td className='text-center'>
              {complaint.technician ? (
    complaint.technician.firstName
  ) : (
    'N/A'
  )}
              </td>
              <td className='flex justify-center self-center text-center items-center'>
          
        {complaint.status === 'pendingTechnicianApproval' && (
          <button className=''> <span className='badge badge-ghost badge-sm whitespace-nowrap'>Pending Technician Approval</span></button>
        )}
              
        {complaint.status === 'pendingHostDecision' && (
          <button className=''> <span className='badge badge-ghost badge-sm whitespace-nowrap'>Pending Host Decision</span></button>
        )}
              </td>

              <td className='text-center'>
        
        {complaint.status === 'pendingTechnicianApproval' && (
          <button className="bg-green-500 rounded-xl text-white text-xs p-3 " onClick={() => handleStatusChange(complaint.id, 'resolved')}> <span className=''>Mark as pending</span></button>
        )}
        {complaint.status === 'pendingHostDecision' && (
          <button className="bg-green-500 rounded-xl text-white text-xs p-3 " onClick={() => handleStatusChange(complaint.id, 'resolved')}> <span className=''>assign to a technician</span></button>
        )}
      </td>
             
            </tr>
          );
          })}
    </tbody>
  </table>
</div>

        </div>

        {/* <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Hosted By</h2>
         <div>user1</div>
        </div> */}

            


      </div>

      {/* <div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className='text-lg'>description here</p>
      </div> */}

     
    </div>
  )
}
