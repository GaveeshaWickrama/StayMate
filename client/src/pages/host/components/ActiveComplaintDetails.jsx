import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PopupForm from "../ResolveComplaintForm";
import ComplaintDetails from '../ComplaintDetails';




export default function ActiveComplaintDetails({complaint}) {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Form submitted for complaint id: ${complaint.id}`);
    setShowModal(false);
    navigate("/technician/tasks");
  };

  

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      

      <div>
<button  className='bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4' 
          onClick={() => setShowModal(true)}
>
Mark Job as completed</button>
<button  className='bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4' 
          onClick={() => setShowModal(true)}
>
Terminate</button>

<PopupForm
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        />
</div>


    </div>
  );
}