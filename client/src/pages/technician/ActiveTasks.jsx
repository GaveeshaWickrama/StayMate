// import React, { useState,  } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Title from '../../components/common/Title';
// import { LinearProgress } from '@mui/material';
// import Table from '../../components/common/Table';


// export default function ActiveTasks() {
//   const [taskState, setTaskState] = useState([
//     { id: 1, state: 'active', title: "leaking faucet", description: "The kitchen faucet has been leaking for the past two days. Water drips continuously from the faucet even when it is turned off, and the leak seems to be getting worse.", postedBy: "user1", property: "golden rose", transportProvided: true },
//     { id: 2, state: 'active', title: "water leak", description: "The kitchen faucet has been leaking for the past two days. Water drips continuously from the faucet even when it is turned off, and the leak seems to be getting worse..", postedBy: "user1", property: "golden rose", transportProvided: false },
//   ]);

//   const handleWithdraw = () => {
//     setTaskState(prevTaskState =>
//       prevTaskState.map(task => task.state === 'active' ? { ...task, state: 'withdraw' } : task)
//     );
//   }

//   const handleCompleted = () => {
//     setTaskState(prevTaskState =>
//       prevTaskState.map(task => task.state === 'active' ? { ...task, state: 'completed' } : task)
//     );

//     navigate('/tasks/proof');

//   }

//   const markProgress = () => {
//     // Implement logic for marking progress if needed
//   }

//   return (
    
// <div className="min-h-screen pb-90">
// <Title title="Active tasks" />
 
// <div className="container mx-auto p-4 mt-[80px] ml-[100px]">
//   {taskState.map(task => (
//     <div key={task.id} className="p-4 border rounded-lg shadow-md mb-4 w-[800px] mt-[50px] ml-[10px] flex">
      
//       <div className="w-2/3 p-4 flex flex-col justify-between">
     
//         <p className="text-md font-semibold ml-[30px]">
//           {/* Task {task.id}: {task.state} */}
//         </p>

//         <div> <span className="mt-2 ml-[30px] mb-4">progress</span>
//         <LinearProgress
//           variant="determinate"
//           value={43}
//           sx={{
//             '& .MuiLinearProgress-bar': {
//               backgroundColor: 'blue', // Customize the bar color
//             },
//           }}
//           className=" w-auto h-20 rounded-lg mt-2 ml-[30px] mb-4"
//         />
// </div>      
       
//         <p className="text-lg font-bold mt-2 ml-[30px] mb-4">{task.title}</p>
//         <p className="text-sm text-gray-600 ml-[30px]">{task.description}</p>
//         <div className="mt-[10px]">
//           <p className="text-sm text-gray-600 ml-[30px] my-[5px]">Posted By {task.postedBy}</p>
          
//         <p className="text-sm underline text-blue-600 ml-[30px]  my-[5px] cursor-pointer" >See Photos</p>

//           {task.transportProvided && (<p className="text-sm text-gray-600 ml-[30px]  my-[5px]">Transport Provided</p>)} 
        
//         </div>
        

        
        
//         <div className=" flex  items-center mt-2 ml-[30px] mb-4">
//           <button onClick={handleWithdraw} className="font-semibold text-white text-sm px-10 py-2 rounded-xl bg-red-500 border border-red-500 rounded ml-[150px] mt-[50px]">
//             Withdraw
//           </button>
//           <button onClick={handleCompleted} className="font-semibold text-white text-sm px-10 py-2 bg-blue-950 rounded-xl ml-[150px] mt-[50px]">
//             Complete
//           </button>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>
// </div>



//   );
// }

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



export default function ActiveTask() {

   
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
                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${technicianID}/activeJobs`);
                 console.log("Response from backend:", response.data); // Log the actual data
       
                 setComplaints(response.data);
                 console.log("these are active complaints",complaints)
               }
               catch(error){
                 console.error("Error fetching complaints:", error); 
               
               }
                 
         };
       
       fetchComplaints();
       
       
           },[technicianID]);

    
           const handleRowClick = (complaintId) => {
            alert(complaintId);
            // navigate(`/host/complaint-details/${complaintId}`);
            navigate(`/technician/${complaintId}/task-details/`);
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
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/technician/tasks/"  className=''>All</a> </div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'><a href="/technician/tasks/pending" >Pending</a></div>
        <div className='title-l pt-4 pb-2 pl-1 mb-3'> <a href="/technician/tasks/active" className='text-blue-500 underline hover:underline-offset-4 hover:decoration-wavy transition-all duration-300' >Active</a> </div>

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


