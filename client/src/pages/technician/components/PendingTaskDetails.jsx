import React, { useEffect, useState } from 'react';
import  TaskDetails  from "../TaskDetails";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PopupForm from "../AcceptJobForm";
import axios from 'axios';




export default function PendingTaskDetails({complaint}) {

  const navigate = useNavigate();

  const [estimatedBudget, setEstimatedBudget] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    console.log(`estimated budget received in handleSave function ${estimatedBudget}`)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints/complaint/${complaint._id}/acceptJob`, { budget : estimatedBudget });

      alert('Budget submitted successfully');
    } catch (error) {
      console.error('Error submitting budget:', error);
    }

    // alert(`Form submitted for complaintt id: ${complaint._id}`);
    setShowModal(false);
    navigate("/technician/tasks");
  };


  const reject = async() => {
    console.log("this is the complaint received by reject function",complaint);
    console.log("this is the complaint id", complaint._id);
    try {
      const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/technicians/rejectJob/${complaint._id}`,
          
      );

      console.log(response);
      if (response.status === 200) {
          alert('job Rejected');
         
      } else {
          alert('Could not save changes, try again');
      }
  } catch (error) {
      console.error('Error occured while rejecting', error);
      alert('An error occurred');
  }
  console.log("Button clicked");
  }

  console.log(complaint.status);
  console.log("initial estimated budget",estimatedBudget);

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">

  
      


      {Number(complaint.estimatedBudget) === null || isNaN(Number(complaint.estimatedBudget))? (
     <div> 
           {/* status = pending technician approval */}

     <button className="bg-red-600 text-white p-4 rounded font-bold w-50 my-10"
     onClick={reject}
     >
       Reject
     </button>
     <button
       className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
       onClick={() => setShowModal(true)}
     >
       Accept and estimate budget
     </button>

     <PopupForm
       isOpen={showModal}
       handleClose={() => setShowModal(false)}
       handleSave={handleSave}
       estimatedBudget={estimatedBudget} // Pass any other necessary props
       setEstimatedBudget={setEstimatedBudget} // Pass setter function if needed
     />
   </div>
  ) : (
    <div>
       {/* status = pending host confirmation */}
    {complaint.estimatedBudget != null && !isNaN(Number(complaint.estimatedBudget)) && (
    <div className="bg-blue-100 p-5 m-3">
      Awaiting host confirmation, You estimated a budget of $
      {Number(complaint.estimatedBudget).toFixed(2)}
    </div>
  )}
 
  </div>

  )}
    </div>
  );
}