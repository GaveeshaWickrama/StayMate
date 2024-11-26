// import React from 'react'

// export default function ActiveTaskDetails() {
//   return (
//     <div>

//  <div className="container mx-auto p-4 mt-[80px] ml-[100px]">
//    {taskState.map(task => (
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

//     </div>
//   )
// }
// import React, { useState } from 'react';

// // Modal Component
// function Modal({ show, onClose, onSave }) {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Upload Proof</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             &times;
//           </button>
//         </div>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="proof" className="block text-sm font-medium text-gray-700">Upload Proof</label>
//             <input type="file" id="proof" className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
//             <textarea id="comments" rows="3" className="mt-1 block w-full text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
//           </div>
//           <div className="flex justify-end space-x-4">
//             <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Close</button>
//             <button type="button" onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// ActiveTaskDetails Component
// function ActiveTaskDetails({ complaint }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleClose = () => setShowModal(false);
//   const handleSave = () => {
//     alert(`Form submitted for complaint id: ${complaint._id}`);
//     setShowModal(false);
//   };

//   return (
//     <div>

//       <div className='flex flex-row gap-3'>
//       <button className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10" onClick={() => setShowModal(true)}>Extend</button>
//       <button className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10" onClick={() => setShowModal(true)}>Mark as Completed</button>
//       </div>

//       <div>{complaint.status}</div>

//       <Modal show={showModal} onClose={handleClose} onSave={handleSave} />
//     </div>
//   );
// }

// export default ActiveTaskDetails;

import React, { useEffect, useState } from "react";
import TaskDetails from "../TaskDetails";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PopupForm from "../UploadProofForm";
import axios from 'axios';
import ProgressBar from "./ProgressBar";

export default function ActiveTaskDetails({ complaint }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSave = (e) => {
    
    alert(`Form submitted for complaint id: ${complaint.id}`);
    setShowModal(false);
    navigate("/technician/tasks");
  };

  const extend = async() => {

    console.log("this is the complaint received by extend function",complaint);
    console.log("this is the complaint id", complaint._id);
    try {
      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/technicians/extendJob/${complaint._id}`,
          
      );

      console.log(response);
      if (response.status === 200) {
          alert('extend successful');
         
      } else {
          alert('Failed to extend');
      }
  } catch (error) {
      console.error('Error extending the deadline:', error);
      alert('An error occurred while extending job');
  }
  console.log("Button clicked");
};

return (
  <div className="bg-gray-100 mx-auto py-2 px-8">
    {/* <ProgressBar complaint = {complaint}/> */}
    <div className="flex flex-row">
      <button
        className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
        onClick={extend}
      >
        Extend
      </button>
      <div className="flex flex-row items-center">
      <button
        className={`bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4 `}
        onClick={() => setShowModal(true)}
        
      >
        Mark Job as completed
      </button>

      
      </div>
     

      <PopupForm
        isOpen={showModal}
        complaintId={complaint._id}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
      />
    </div>
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
{/* console.log */}
    <div></div>
  </div>
);


  }



