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

  

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      

      <div>
<button  className='bg-blue-600 text-white p-4 rounded font-bold w-50 my-10'>Reject</button>
<button  className='bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4' 
          onClick={() => setShowModal(true)}
>
Accept and estimate budget</button>

<PopupForm
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        />
</div>


    </div>
  );
}