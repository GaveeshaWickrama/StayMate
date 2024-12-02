import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintDetails from "../ComplaintDetails";
import PopupForm from "../RateTechnicianForm";
import { useAuth } from '../../../context/auth'; // Adjust the path as necessary

function FinishedComplaintDetails({ complaint, complaintId }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // const complaintId= complaintId;
  const markJobAsCompleted = () => {};

  const [showModal, setShowModal] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Form submitted for complaint id: ${complaint._id}`);
    setShowModal(false);
    // navigate("/technician/tasks");
  };


  const rate = (complaintId) => {
    if(!complaintId){
      console.error("complaint id is missing!");
      return; 
    }
  }

  const review = (complaintId) => {
    if(!complaintId){
      console.error("complaint id is missing!");
      return; 
    }
    alert(`complaint ${complaintId}`);
    console.log("received complaint id",complaintId);

    navigate(`/host/complaint/review/${complaintId}`,{ state: { complaintId } });
  }

  console.log("current user Id received in the finished complaint details part", currentUser.id);

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
          onClick={() => review(complaintId)} // Pass complaintId explicitly
          >
         Review 
        </button>
      )}
      {complaint.status==="jobCompleted"  && (
          
        <>

{(complaint.technician.reviews.some((review)=>review.reviewerId.toString() === currentUser.id.toString() &&
review.complaintID.toString() === complaint._id.toString()
 )) && (<div> you have already published your review for this job.</div>)} 


 { (complaint.technician.reviews.some((review)=>review.reviewerId.toString() !== currentUser.id.toString() &&
review.complaintID.toString() !== complaint._id.toString()
 )) && (
<button
          className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
          onClick={() => setShowModal(true)}

          >
         Rate Technician 
        </button>)

 }
          <PopupForm
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
          complaint={complaint}
        />
        </>
          



      )}
     
     {/* onClick={markJobAsCompleted} */}
     
    </div>
  );
}

export default FinishedComplaintDetails