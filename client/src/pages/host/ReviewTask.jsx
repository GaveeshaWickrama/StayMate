import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShower,
  FaStar,
} from "react-icons/fa";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import ProgressBar from "../technician/components/ProgressBar";
import Reviews from "../technician/Reviews";

export default function ReviewTask() {
  // const location = useLocation();
  // const { complaintId } = location.state || {};
  const {complaintId} = useParams();
  // const [complaint, setComplaint] = useState({description:"Loading"});
  const [complaint, setComplaint] = useState(null);
  console.log(`complaint id before entering use effect: ${complaint}`);

  const navigate = useNavigate();

  
    const fetchComplaint = async () => {
      if (!complaintId) {
        console.error("Complaint ID is missing!");
        return;
      }
      console.log("Sending complaintId:", complaintId);

      try {
  
       
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/complaints/complaint-details/${complaintId}`
        );
        console.log("Response from backend:", response.data); // Log the actual data
  
        setComplaint(response.data);
      } catch (err) {}
  
     
    };

    useEffect(() => {

    fetchComplaint();
  }, [complaintId, complaint?.status]);

  console.log("this is the complaint", complaint);
  console.log("this is the complaint id", complaintId);


  if (!complaint) {
    return <div>Loading complaint details...</div>; // Loading indicator
  }
  


  const review = async (complaintId) => {
  
    if (!complaintId) {
      console.error("Complaint ID is missing!");
      return;
    }
    await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/complaints/complaint/${complaintId}/review`
    );
  };


  const messageUser = () => {
    navigate("/host/chat");
  }


  return (
    // <div className="bg-gray-100 mx-auto py-2 px-8">
    //     <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
    //     <h1 className="flex items-center text-4xl font-extrabold text-black-600">
    //      Review Complaint
    //     </h1>
    //     <div className="flex items-center text-gray-600 ml-6 mt-3">

    //     </div>
    //   </div>
    // </div>

    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaHome className="mr-4" /> Review job
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          <FaClock className="mr-2" /> <span>Added on: date</span>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        {/* <Carousel images="" /> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex flex-row justify-between items-center border-b">
            <div className="flex flex-row items-center">
              <h2 className="text-xl font-bold">Status:</h2>
              <span className="ml-4 badge bg-yellow-100">
                {complaint.status}
              </span>
            </div>

            <div className="flex flex-row items-center p-2 gap-3">
              <h2 className="text-xl font-bold">Category:</h2>

              <p className="bg-blue-300 p-4 rounded-lg text-white">
                {complaint.category}
              </p>
            </div>
          </div>
          <div className="bg-white p-8 flex items-center border-b">
            <ProgressBar complaint={complaint} />
          </div>
          {/* <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
            <p>Completed Date</p>
            <p>Proof Uploaded</p>
            <p>technician:</p>
            <p>remaining days</p>
          </div> */}

          <div className="flex flex-row gap-8 justify-between py-10 px-8 border-b">
            {complaint.taskCompletedDate && (
              <p className="text-base flex flex-col self-center">
                <span className="font-bold">Completed Date:</span>{" "}
                {new Date(complaint.taskCompletedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) || "No Date Available"}
              </p>
            )}


{complaint.estimatedBudget ? (
              <p className="text-base flex flex-col items-center">
                <span className="font-bold">Estimated Budget:</span>{" "}Rs{" "}
                {complaint.estimatedBudget} 
              </p>
            ) : (
              <p className="text-base flex flex-col items-center text-gray-500">
                No budget estimated yet.
              </p>
            )}
           {complaint.deadline && (
  <p className="text-base flex flex-col self-center">
    <span className="font-bold">Days Remaining:</span>{" "}
    {Math.ceil(
      (new Date(complaint.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
    )}{" "}
    days
  </p>
)}
           

<p className="text-base flex flex-col self-center">
              {" "}
              <span className="font-bold">Deadline</span>{" "}
              {new Date(
                complaint.deadline
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="py-10 px-8 border-b">
            <div className="bg-white p-8 flex flex-col">
              <h2 className="text-xl font-bold pb-2">Proof Images</h2>
              <p className="flex flex-row gap-3 flex-wrap">
                {complaint.proofImages &&
                  complaint.proofImages.map((image, index) => (
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

          <div className="bg-white p-8 flex items-center">
            <h2 className="text-xl font-bold">
              Additional Comments by the technician{" "}
            </h2>

            {complaint.additionalComments ? (
              <p className="ml-4 text-gray-700">
                {complaint.additionalComments}
              </p>
            ) : (
              <p className="ml-4 text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow md:flex md:flex-col ">
          <div className="flex items-center p-6 gap-4">
            <h2 className="text-xl font-bold">Assigned on:</h2>

            <p className="text-base">
              {new Date(complaint.assignedDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center p-6 gap-4">
            <h2 className="text-xl font-bold mb-2">Assigned Technician</h2>
            <div className="text-xl card">
              {" "}
              {complaint.technician.userId.firstName}{" "}
              {complaint.technician.userId.lastName}
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
                {" "}
                {complaint.technician.userId.firstName}{" "}
                {complaint.technician.userId.lastName}
              </h3>
              <h2 className="text-base font-bold">
                {complaint.technician.subRole}
              </h2>
              <div className="text-gray-500 mb-4">
                Joined on <br /> 2021-06-15
              </div>
              <button
                className="bg-blue-600 text-white p-2 rounded font-bold flex items-center"
                // onClick={handleMessageHost}
                // disabled={isLoading}
              >
                <FaEnvelope className="mr-2" size={24} />{" "}
                <span className="text-white" onClick={messageUser}>
                  Message
                </span>
                {/* <span>{isLoading ? <span className='loading loading-spinner mx-auto'></span> : 'Message Host'}</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
        <h2 className="text-xl font-bold mb-2">User Description</h2>
        <p className="text-lg">{complaint.description}</p>
        <button
          className="bg-blue-600 text-white p-2 rounded font-bold flex items-center"
          onClick={() => review(complaint._id)}
          disabled={!complaintId || !complaint 
         

          }
        >
          {!complaintId || !complaint ? "Loading..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
