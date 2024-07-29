import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShower,
  FaStar,
} from "react-icons/fa";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import PendingTaskDetails from "./components/PendingTaskDetails";
import CompletedTaskDetails from "./components/CompletedTaskDetails";
import ActiveTaskDetails from "./components/ActiveTaskDetails";
// import PendingComplaintDetails from "./components/PendingComplaintDetails";

export default function ComplaintDetails(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const mockComplaint = {
    id: "23437467839434y8y",
    title: "Room not cleaned",
    category: "Housekeeping",
    reservationId: {
      user: {
        firstName: "John",
        lastName: "Doe",
      },
      checkInDate: "2023-07-20",
      checkOutDate: "2023-07-25",
      property: {
        title: "Ocean View Hotel",
        location: {
          address: "123 Beachside Blvd, Miami, FL",
        },
        host_id: {
          firstName: "Alice",
          lastName: "Johnson",
        },
      },
    },
    status: "active",
    images: ["image1.jpg", "../../assets/complaintImages/complaint_1.jpeg"],
    description: "The room was not cleaned when I checked in.",
  };

  const complaint = mockComplaint;

  const handleFindTechnician = () => {
    navigate(`/host/view-technicians`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Form submitted for complaint id: ${complaint.id}`);
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
              <h2 className="text-xl font-bold">Posted On:</h2>

              <p className="text-base">2022-03-2</p>
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
              <span className="font-bold">Section:</span>Room No 4
            </p>
            <p className="text-base flex flex-col self-center">
              {" "}
              <span className="font-bold">Checked In Date:</span>{" "}
              {complaint.reservationId.checkInDate}
            </p>
            <p className="text-base flex flex-col items-center">
              <span className="font-bold">Check Out Date:</span>{" "}
              {complaint.reservationId.checkOutDate}
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
              {complaint.images.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Complaint Image ${index + 1}`}
                  className="mt-2 w-13 h-13"
                />
              ))}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow flex flex-col ">
          <div className="flex items-center p-6 gap-4">
            <h2 className="text-xl font-bold mb-2">Posted By</h2>
            {/* <div className='text-xl card'> {complaint.reservationId.user.firstName} {complaint.reservationId.user.lastName}</div> */}
          </div>

          <div className="flex items-center  bg-blue-100 rounded-xl p-8">
            <div className="flex flex-col items-center mr-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Host"
                className="w-25 h-25 rounded-full mb-2"
              />
              <h3 className="text-lg font-bold">John Doe</h3>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-start mb-2">
                {/* <FaPhone className="mr-2" size={24} /> */}
                <span>555-1234</span>
              </div>
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

      {/* <div>
                {complaint.status === 'active' ? (
                    <ActiveComplaintDetails complaint={complaint} id={1}>
                        {props.children}
                    </ActiveComplaintDetails>
                ) : complaint.status === 'pendingHostDecision' ? (
                    <PendingComplaintDetails complaint={complaint} id={1}>
                        {props.children}
                    </PendingComplaintDetails>
                ) : (
                    <PendingComplaintDetails complaint={complaint} id={1}>
                        {props.children}
                    </PendingComplaintDetails>
                )}
            </div> */}

      <div>
       
       
        <PendingTaskDetails complaint={complaint}>
          {props.children}
        </PendingTaskDetails>

          <CompletedTaskDetails complaint={complaint}>
{props.children}
          </CompletedTaskDetails>
        {/* <PopupForm
          isOpen={showModal}
          handleClose={() => setShowModal(false)}
          handleSave={handleSave}
        /> */}
      </div>
    </div>
  );
}
