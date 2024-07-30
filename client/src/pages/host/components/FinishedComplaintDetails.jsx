import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintDetails from "../ComplaintDetails";


export default function FinishedComplaintDetails({ complaint}) {
 
 
 
    const navigate = useNavigate();


const markJobAsCompleted = () => {

}




  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div>
        
        <button
          className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          onClick={markJobAsCompleted}
        >


           Rate Technician
        </button>
      </div>
    </div>
  );
}
