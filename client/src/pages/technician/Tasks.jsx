
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FaHome, FaMapPin, FaClock, FaMapMarkerAlt, FaShower  } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import { format } from 'date-fns';
// import { useAuth } from "../context/auth";
import { useAuth } from "../../context/auth";




function NoJobs(){
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 mx-20 my-20">no jobs found</p>
      {/* <Link to="/host/add-technician" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2">
        
        
      </Link> */}
    </div>
  );
}











export default function Tasks() {

   
  const { currentUser, loading } = useAuth();

    // const [technicianID, setTechnicianID] = useState('');
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();

    console.log("Current user object:", currentUser);
    console.log("this is the current user id",currentUser.id)
    console.log("this is the current user name",currentUser.firstName)

    const technicianID = currentUser.id
    console.log("technician id",technicianID)
    console.log("this is the technician id", technicianID)
    useEffect(()=>{

    
             const fetchComplaints = async () => {
               console.log("inside the fetchcomplaint");
               console.log(import.meta.env.VITE_API_URL);
       
       
               try{
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${technicianID}/jobs`);
                 console.log("Response from backend:", response.data); // Log the actual data
                 console.log("Response from backend complaint id:", response.data._id); // Log the actual data
       
                 setComplaints(response.data);
                
               }
               catch(error){
                 console.error("Error fetching all complaints:", error); 
               
               }
                 
         };
       
       fetchComplaints();
       
       
           },[technicianID]);
           console.log("these are all the complaints",complaints)
    
           const handleRowClick = (complaintId) => {
            
            alert(complaintId);
            console.log("this is the complaint id", complaintId)
            // navigate(`/technician/${technicianID}/task-details`);
            navigate(`/technician/${complaintId}/task-details`);
          };

  return (



    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
           Tasks
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="w-full">

        <div className='flex flex-row gap-10'>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/technician/tasks/"  className='text-blue-500 underline hover:underline-offset-4 hover:decoration-wavy transition-all duration-300'>All</a> </div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'><a href="/technician/tasks/pending" className=''>Pending</a></div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/technician/tasks/active" className='' >Active</a> </div>

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
        <th>Action</th>
      </tr>
    </thead>


    
    <tbody>
      {/* row 1 */}
     
    {console.log("this is the complaints length",complaints.length)}
   {complaints.length===0 ? (console.log("complaint length is zero")) : (console.log("comnplaint length is not zero"))}

   {complaints.length === 0 ? (
  // This will log "complaint length is zero" to the console if complaints length is zero
  console.log("complaint length is zero") || <NoJobs />
) : (
  complaints.map((complaint, index) => {
    const formattedDate = format(new Date(complaint.timestamp), 'yyyy-MM-dd');
    return (
      <tr key={complaint._id} className="hover:bg-gray-100" onClick={() => handleRowClick(complaint._id)}>
        <th>{index + 1}</th>
        <td>{complaint.category}</td>
        <td>{complaint.title} : {complaint.description}</td>
        <td>{formattedDate}</td>
        <td><span>complete</span></td>
      </tr>
    );
  })
)}
     

    </tbody>
  </table>
</div>

        </div>


            


      </div>


     
    </div>
  )
}
