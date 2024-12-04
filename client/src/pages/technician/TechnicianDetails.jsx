import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import PopupForm from "../host/SendRequestToTechnicianForm";
import { FaRegEnvelope } from "react-icons/fa6";




function TechnicianDetails() {

  const { id } = useParams();  //technician id
  const { currentUser } = useAuth();  //host id
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const complaintID = queryParams.get("complaintID");
  const hostID = currentUser.id;
  const [showModal, setShowModal] = useState(false);
  const [technician, setTechnician] = useState(null);
  const [noOfCompletedJobs, setNoOfCompletedJobs] = useState(0);

  // const handleSave = async (e) => {
  //   e.preventDefault();

  // //   setShowModal(false);
  // //   // alert(`Form submitted for complaint id: ${complaint.id}`);

  // //   // <HandleSendRequest complaintId={complaintID} technicianID={id} hostID={hostID} />

  // //   navigate("/host/manage-complaints");
  // // };


  const message = () => {
    navigate('/host/chat')
  }

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${id}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician:', error);
      }
    };



    const fetchCompletedJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${id}/noOfJobsCompleted`);
        setNoOfCompletedJobs(response.data);
      } catch (error) {
        console.error('Error fetching completed jobs:', error);
      }
    };

    fetchTechnician();
    fetchCompletedJobs();
  }, [id]);

  if (!technician) {
    return <div>Loading...</div>;
  }



  console.log("id",id);


 

// console.log("id",id);
// console.log("noof completed jobs", noOfCompletedJobs);


  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <div>
          <img
         src={`  ${import.meta.env.VITE_API_URL}/uploads/profilePictures/test`}
            alt="Technician"
            className="w-20 h-20 rounded-full mx-2"
          />
        </div>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          {technician.userId.firstName} {technician.userId.lastName}
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3"></div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4"></div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex flex-col text-xl gap-4 border-b">
            <h2 className="text-xl font-bold mb-2">About</h2>
            <p className="text-lg">{technician.about}</p>
          </div>
          <div className="bg-white p-8 flex items-center ">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">{technician.location.address}</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center p-6 gap-4 ">
            <h2 className="text-xl font-bold ">Skill</h2>
            <div className="bg-blue-300 p-2 rounded-lg text-white">
              <span className="text-lg">{technician.subRole}</span>
            </div>
          </div>
          <div className="flex items-center p-6 gap-4 ">
            <h2 className="text-xl font-bold mb-2">Date Joined</h2>
            <div className="text-lg">
              {new Date(technician.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center p-6 gap-4">
            <h2 className="text-xl font-bold ">Jobs done</h2>
            <div className="text-lg">{noOfCompletedJobs || 0}</div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
  <h2 className="text-xl font-bold mb-3 pb-4">Reviews</h2>

  {/* Check if reviews exist */}
  {technician?.reviews && technician.reviews.length > 0 ? (
    technician.reviews.slice(0, 5).map((review, index) => (
      <div key={index} className="border-b flex flex-col items-start mb-4 pb-4">
        <div className="flex flex-row gap-2 p-2 items-center">
          {/* Placeholder for profile picture */}
          <div className="rounded-full w-10 h-10 bg-blue-100 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/profilePictures/${review.userId}`}
              alt={review.userName || "User"}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Reviewer details */}
          <div className="flex flex-col">
            <span className="text-lg">{review.userName || "Anonymous"}</span>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Rating */}
        <p className="text-sm text-gray-500">

<div className='rating w-3/5'>
{[1,2,3,4,5].map((star)=> (
 <input
 key={star}
 type="radio"
 name="rating"
 className={`mask mask-star ${star<=review.rating ? "bg-yellow-500": "bg-gray-300"}`}
 disabled
 checked={star <= Math.floor(review.rating)} //fill up to the whole number part
 >
 </input>
))}
{/* {user.rating % 1 >= 0.5 && (
 <input
 type="radio"
 name="rating"
 className='mask mask-star-half bg-yellow-500'
 disabled
 checked
 >
 </input>
)} */}
<span className='m-1 text-xs font-bold'>{review.rating ? review.rating.toFixed(1) : "N/A"}</span>
</div>
 
</p>
        {/* Review comment */}
        <p className="text-lg p-1">{review.review || "No comment provided."}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-center">No reviews available.</p>
  )}
</div>


    


      <div className="flex flex-row">
      <button
        className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
        onClick={() => setShowModal(true)}
      >
        Send Request
      </button>
      <button
        className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4 items-center flex flex-row gap-3 "
        onClick={message}
      >
        <FaRegEnvelope />
        Message
      </button>
      </div>

      <PopupForm
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        complaintId = {complaintID}
        technicianID = {id}
        hostID = {hostID}
      />
    </div>
  );
}

export default TechnicianDetails;
