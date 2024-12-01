import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaClock,
  FaRegClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShower,
  FaStar,
} from "react-icons/fa";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";

import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import PendingTaskDetails from "./components/PendingTaskDetails";
import CompletedTaskDetails from "./components/CompletedTaskDetails";
import ActiveTaskDetails from "./components/ActiveTaskDetails";
// import PendingComplaintDetails from "./components/PendingComplaintDetails";
import ProgressBar from './components/ProgressBar'

export default function ComplaintDetails(props) {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

 

  console.log("complaint id received by task details function", id);

  console.log("complaint id received by task details function", id);
  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`
        );
        //   console.log(`${import.meta.env.VITE_API_URL}/complaints/${id}`);
        setComplaint(response.data);
        console.log("this is the response data", complaint);
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };

    fetchComplaint();
  }, [id]);

  console.log(complaint);

  if (!complaint) {
    return <div>Job not found</div>;
  }

  // const handleFindTechnician = () => {
  //   navigate(`/host/view-technicians`);
  // };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Form submitted for complaint id: ${complaint.id}`);
    setShowModal(false);
    navigate("/technician/tasks");
  };

  const currentDate = new Date();
  const deadlineDate = new Date(complaint.deadline);
  const timeLeft = deadlineDate - currentDate; // Time difference in milliseconds

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <div className="flex flex-row justify-between">
          <h1 className="flex items-center text-4xl font-extrabold text-black-600">
            {complaint.title}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex flex-row justify-between items-center border-none">
            <div className="flex flex-row items-center">
              <h2 className="text-xl font-bold">Status:</h2>
              {complaint.status === "pendingTechnicianApproval" && Array.isArray(complaint.estimatedBudget) && complaint.estimatedBudget.length > 0 && (
  <p className="ml-4 badge badge-ghost bg-yellow-200">
    Pending Budget Confirmation
  </p>
)}

{complaint.status === "pendingTechnicianApproval" && (!Array.isArray(complaint.estimatedBudget) || complaint.estimatedBudget.length === 0) && (
  <p className="ml-4 badge badge-ghost bg-yellow-200">
    {complaint.status}
  </p>
)}
              {complaint.status === "active" && (
                <p className="ml-4 badge badge-ghost bg-yellow-200">
                {complaint.status}
              </p>
              )}
              {complaint.status === "technicianCompleted" && (
                <p className="ml-4 badge badge-ghost bg-yellow-200">
                awaiting Proof review
              </p>
              )}
              {complaint.status === "jobCompleted" && (
                <p className="ml-4 badge badge-ghost bg-yellow-200">
                Job Finished
              </p>
              )}
              {/* <p className="ml-4 badge badge-ghost bg-yellow-200">
                {complaint.status}
              </p> */}
            </div>
                  
            <div className="flex flex-row items-center p-2 gap-3">
              <h2 className="text-xl font-bold">Category:</h2>

              <p className="bg-blue-300 p-4 rounded-lg text-white">
                {complaint.category}
              </p>
            </div>
         
          </div>

          
          {complaint.status==="active" && (
                    <div className="flex w-full items-center border-none">
                    <ProgressBar complaint={complaint}/>
                    </div>
                  )}
        
          <div className="bg-white p-8 flex items-center border-b border-t">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">
              {complaint.reservationId.property.title}{" "}
              {complaint.reservationId.property.location.address}
            </p>
          </div>
          <div className="bg-white p-8 flex flex-col">
            <h2 className="text-xl font-bold pb-2">Images</h2>
            <p className="flex flex-row gap-3 flex-wrap">
              {complaint.images.map((image, index) => (
                <img
                  key={index}
                  src={`${import.meta.env.VITE_API_URL}/${image}`}
                  alt={`Complaint Image ${index + 1}`}
                  className="mt-2 w-13 h-13"
                />
              ))}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow flex flex-col ">
          <div className="flex items-center p-6 gap-4">
            <h2 className="text-xl font-bold">Posted On:</h2>

            <p className="text-base">
              {new Date(complaint.timestamp).toLocaleDateString()}
            </p>
          </div>
          {(complaint.status !== "pendingHostDecision" || complaint.status!=="hostCompleted") && (<div className="flex items-center p-6 gap-4">
          {/* {complaint.status === "pendingTechnicianApproval" && (<div className="flex items-center p-6 gap-4"> */}
            <h2 className="text-xl font-bold">Assigned On:</h2>

            <p className="text-base">
              {new Date(complaint.assignedDate).toLocaleDateString()}
            </p>
          </div>)}

          <div className="flex items-base p-6 gap-4">
            <h2 className="text-xl font-bold mb-2">Posted By</h2>
            <div className="text-xl card">
              {" "}
              {complaint.reservationId.property.host_id.firstName}{" "}
              {complaint.reservationId.property.host_id.lastName}
            </div>
          </div>

          <div className="flex items-center  bg-blue-100 rounded-xl p-8">
            <div className="flex flex-col items-center mr-4">
              <img
                src={`${
                  import.meta.env.VITE_API_URL
                }/uploads/profilePictures/2.jpeg`}
                alt="Host"
                className="w-20 h-20 rounded-full mb-2"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold">
                {complaint.reservationId.property.host_id.firstName}{" "}
                {complaint.reservationId.property.host_id.lastName}
              </h3>
              <div className="text-gray-500 mb-4 items-center">
                <span className="block text-black">Joined On</span>
                {new Date(
                  complaint.reservationId.property.host_id.createdOn
                ).toLocaleDateString()}
              </div>
              <button
                className="bg-blue-600 text-white p-2 rounded font-bold flex items-center"
                // onClick={handleMessageHost}
                // disabled={isLoading}
              >
                <FaEnvelope className="mr-2" size={24} />{" "}
                <span className="text-white">Message</span>
                {/* <span>{isLoading ? <span className='loading loading-spinner mx-auto'></span> : 'Message Host'}</span> */}
              </button>
            </div>
          </div>

{complaint.deadline && (
  <div className="flex flex-col  bg-green-100 rounded-xl p-8 m-6 items-start ">
            <p className="text-base flex flex-row items-center gap-6">
              <span className="font-bold text-xl"> Deadline:</span>{" "}
              <span className="text-lg">
               {new Date(complaint.deadline).toLocaleDateString()}
              </span>
            </p>
              
            <p className="text-sm mt-3 flex flex-row items-center gap-2">
              {" "}
              <FaRegClock /> 
              {timeLeft <= 0 ? (
          <div>Expired</div>
        ) : (
         <div>
          {Math.floor(timeLeft / (1000 * 60 * 60 * 24))}{" "}
          {Math.floor(timeLeft / (1000 * 60 * 60 * 24)) > 1 ? "days" : "day"} left</div>

          
        )}
            </p>
          </div>
)}
          
          {console.log(typeof complaint.estimatedBudget)}

          <div>
            {(Array.isArray(complaint.estimatedBudget) && complaint.estimatedBudget.length > 0) && (
              <div className="m-3 p-1">
                <span>
                  Your estimated budget for this job
                </span>
                <ul className="list-disc pl-5 mt-2">
      {complaint.estimatedBudget.map((item, index) => (
        <li key={index}>
          <span className="font-semibold">{item?.expense}:</span> LKR {item?.value?.toFixed(2)}

        </li>
      ))}
    </ul>
              </div>
            )}
          </div>
        
        </div>
      </div>

      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
        <div className="m-3 p-1">
          <h2 className="text-xl font-bold mb-2">User Description</h2>
          <p className="text-lg">{complaint.description}</p>
        </div>

        {complaint.assignTaskComments && (
          <div className="m-3 p-1  border-t">
            <h2 className="text-xl font-bold mb-2">Host Remarks</h2>
            <p className="text-lg">{complaint.assignTaskComments}</p>
          </div>
        )}
      </div>

      {/* <div>
        {complaint.status === "active" ? (
          <ActiveTaskDetails complaint={complaint} id={id}>
            {props.children}
          </ActiveTaskDetails>
        ) : complaint.status === "pending" ? (
          <PendingTaskDetails complaint={complaint} id={id}>
            {props.children}
          </PendingTaskDetails>
        ) : (
          <CompletedTaskDetails complaint={complaint} id={id}>
            {props.children}
          </CompletedTaskDetails>
        )}
      </div> */}

      {complaint.status === "pendingTechnicianApproval" ? (
        <PendingTaskDetails complaint={complaint}>
          {props.children}
        </PendingTaskDetails>
      ) : complaint.status === "active" ? (
        <ActiveTaskDetails complaint={complaint}>
          {props.children}
        </ActiveTaskDetails>
      ) : (
        <CompletedTaskDetails complaint={complaint} />
      )}



    </div>
  );
}
