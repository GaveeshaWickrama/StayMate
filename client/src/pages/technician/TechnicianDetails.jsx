import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import PopupForm from "../host/SendRequestToTechnicianForm";
import { FaRegEnvelope } from "react-icons/fa6";




function TechnicianDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const complaintID = queryParams.get("complaintID");
  const hostID = currentUser.id;
  const [showModal, setShowModal] = useState(false);
  const [technician, setTechnician] = useState(null);


  const handleSave = (e) => {
    e.preventDefault();
    setShowModal(false);
    alert(`Form submitted for complaint id: ${complaint.id}`);

    // <HandleSendRequest complaintId={complaintID} technicianID={id} hostID={hostID} />

    navigate("/host/manage-complaints");
  };

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians/${id}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician:', error);
      }
    };

    fetchTechnician();
  }, [id]);

  if (!technician) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <div>
          <img
          src={`../../assets/${technician.proPic}`}
            alt="Technician"
            className="w-10 h-10 rounded-full mx-2"
          />
        </div>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          {technician.firstName} {technician.lastName}
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
              <span className="text-lg">Plumber</span>
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
            <div className="text-lg">7</div>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
        <h2 className="text-xl font-bold mb-3 pb-4">Reviews</h2>

        <div className="border-b flex flex-col items-start">
          <div className="flex flex-row gap-2 p-2 items-center">
            <div className="rounded-full w-10 h-10 bg-blue-100">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg">chamma siri</span>
              <span className="text-sm text-gray-500">2022-03-02</span>
             
            </div>
          </div>
          <div className="p-1">
                {/* <span className="text-base p-2">4.5</span> */}
                <div className="rating rating-sm	 ">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
          <p className="text-lg pb-5 p-1">Attended to the issue immediately!</p>
        </div>
      </div>

      <button
        className="bg-blue-600 text-white p-4 rounded font-bold w-50 my-10 m-4"
        onClick={() => setShowModal(true)}
      >
        Send Request
      </button>
      <button
        className="bg-green-600 text-white p-4 rounded font-bold w-50 my-10 m-4 items-center "
        onClick={() => setShowModal(true)}
      >
        <FaRegEnvelope />
        Message
      </button>

      <PopupForm
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
      />
    </div>
  );
}

export default TechnicianDetails;
