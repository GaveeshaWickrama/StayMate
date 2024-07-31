import React, { useState, useEffect } from "react";

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
} from "react-router-dom";

import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import ActiveComplaintDetails from "./components/ActiveComplaintDetails";
import PendingComplaintDetails from "./components/PendingComplaintDetails";
import FinishedComplaintDetails from "./components/FinishedComplaintDetails";

export default function ComplaintDetails(props) {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`
        );
        console.log(
          `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${id}`
        );
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
    return <div>Complaint not found</div>;
  }

    const handleFindTechnician = () => {
      navigate(`/host/view-technicians`);
    };

    const handleSave = (e) => {
      e.preventDefault();
      alert(`Form submitted for complaint id: ${complaint._id}`);
      setShowModal(false);
      navigate("/host/manage-complaints");
    };

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
            <div className="bg-white p-8 flex flex-row justify-between items-center border-b">
              <div className="flex flex-row items-center">
                <h2 className="text-xl font-bold">Status:</h2>
                <p className="ml-4 badge badge-ghost">{complaint.status}</p>
              </div>

             
              <div className="flex flex-row items-center p-2 gap-3">
                <h2 className="text-xl font-bold">Category:</h2>

                <p className="bg-blue-300 p-4 rounded-lg text-white">
                  {complaint.category}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-8 justify-between py-10 px-8 border-b">
              <p className="text-base flex flex-col self-center ">
                {" "}
                <span className="font-bold">Section:</span> Room no 4
              </p>
              <p className="text-base flex flex-col self-center">
                {" "}
                <span className="font-bold">Checked In Date:</span>{" "}
                {new Date(complaint.reservationId.checkInDate).toLocaleDateString()}

              </p>
              <p className="text-base flex flex-col items-center">
                <span className="font-bold">Check Out Date:</span>{" "}
                {new Date(complaint.reservationId.checkOutDate).toLocaleDateString()}

              </p>
              <p className="text-base flex flex-col items-center">
                <span className="font-bold">Property Name:</span>{" "}
                {complaint.reservationId.property.title}
              </p>
            </div>
            <div className="bg-white p-8 flex items-center border-b">
              <FaMapMarkerAlt className="mr-2" />
              <p className="font-semibold">
                {complaint.reservationId.property.title}{" "}
                {complaint.reservationId.property.location.address}
              </p>
            </div>
            <div className="bg-white p-8 flex flex-col">
              <h2 className="text-xl font-bold pb-2">Images</h2>
              <p className="flex flex-row gap-3 flex-wrap">
                {complaint.images &&
                  complaint.images.map((image, index) => (
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
            
            <div className="flex items-center p-6 gap-4">
              <h2 className="text-xl font-bold mb-2">Posted By</h2>
              <div className="text-xl card">
                {" "}
                {complaint.reservationId.user.firstName}{" "}
                {complaint.reservationId.user.lastName}
              </div>
            </div>

            <div className="flex items-center  bg-blue-100 rounded-xl p-8">
              <div className="flex flex-col items-center mr-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Host"
                  className="w-25 h-25 rounded-full mb-2"
                />
                
              </div>
              <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold">
                {" "}
                {complaint.reservationId.user.firstName}{" "}
                {complaint.reservationId.user.lastName}
                </h3>
                <div className="text-gray-500 mb-4">Joined on 2021-06-15</div>
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
          </div>
        </div>

        <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
          <h2 className="text-xl font-bold mb-2">Description</h2>
          <p className="text-lg">{complaint.description}</p>
        </div>

        <div className="bg-blue-100">
  {complaint.estimatedBudget && (
    <p className="text-gray-500">
      Budget Estimation received by {complaint.technician.firstName} {complaint.estimatedBudget}
    </p>
  )}
</div>

        <div>
          {complaint.status === "active" ? (
            <ActiveComplaintDetails complaint={complaint} id={id}>
              {props.children}
            </ActiveComplaintDetails>
          ) : complaint.status === "pendingHostDecision" ? (
            <PendingComplaintDetails complaint={complaint} id={id}>
              {props.children}
            </PendingComplaintDetails>
          ) : (
            <FinishedComplaintDetails complaint={complaint}>
              {props.children}
            </FinishedComplaintDetails>
          )}
        </div>
      </div>
    );
  }

