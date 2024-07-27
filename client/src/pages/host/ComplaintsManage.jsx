import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaMapPin, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import { format } from 'date-fns';


export default function ComplaintsManage() {

   

    const [hostID, setHostID] = useState('6677b440ceb4d10a38fe8d61');
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    

    useEffect(()=>{

    
             const fetchComplaints = async () => {
               console.log("inside the fetchcomplaint");
               console.log(import.meta.env.VITE_API_URL);
       
       
               try{
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/${hostID}`);
                 console.log("Response from backend:", response.data); // Log the actual data
       
                 setComplaints(response.data);
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

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaHome className="mr-4" /> Complaints
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="w-full">

        <div className='flex flex-row gap-10'>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="#" ><span className='transition-colors duration-1000 hover:text-blue-500 hover:underline-animation'>All</span></a> </div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'><a href="#" >Pending</a></div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="#" >Active</a> </div>

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
            <tr key={complaint._id} className="hover:bg-gray-100"
            onClick={() => handleRowClick(complaint._id)} >
            
            
              <th>{index+1}</th>
              <td>{complaint.category}</td>
              <td>{complaint.title} : {complaint.description}</td>
              <td>{formattedDate}</td>
              <td>{complaint.technician}</td>
              <td><span>mark as resolved</span></td>
             
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
