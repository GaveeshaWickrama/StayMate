import React, { useEffect, useState } from 'react';
import  TaskDetails  from "../TaskDetails";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PopupForm from "../AcceptJobForm";





export default function PendingTaskDetails({complaint}) {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Form submitted for complaint id: ${complaint.id}`);
    setShowModal(false);
    navigate("/host/manage-complaints");
  };

  console.log(complaint.status);

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">

  
      


      {Number(complaint.estimatedBudget) === null || isNaN(Number(complaint.estimatedBudget))? (
     <div> 
           {/* status = pending technician approval */}

     <button className="bg-red-600 text-white p-4 rounded font-bold w-50 my-10">
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