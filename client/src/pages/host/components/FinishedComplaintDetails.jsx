import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintDetails from "../ComplaintDetails";


function FinishedComplaintDetails({ complaint }) {
  const navigate = useNavigate();

  const markJobAsCompleted = () => {};

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      {complaint.status==="hostCompleted" && (
          <button
          className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          onClick={()=>{navigate('/host/manage-complaints')}}
        >
          Back
        </button>
      )}
      {complaint.status==="technicianCompleted" && (
          <button
          className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          
        >
         Review 
        </button>
      )}
     
     {/* onClick={markJobAsCompleted} */}
     
    </div>
  );
}

export default FinishedComplaintDetails