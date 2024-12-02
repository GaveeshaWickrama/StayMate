import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaMapPin,
  FaClock,
  FaMapMarkerAlt,
  FaShower,
} from "react-icons/fa";
import ProgressBar from "../technician/components/ProgressBar";

export default function ReviewTask() {
  // const location = useLocation();
  // const { complaintId } = location.state || {};
  const {complaintId} = useParams();
  const [complaint, setComplaint] = useState(null);
  console.log(`complaint id before entering use effect: ${complaint}`);



  useEffect(() => {
    const fetchComplaint = async () => {
      if (!complaintId) {
        console.error("Complaint ID is missing!");
        return;
      }
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

    fetchComplaint();
  }, [complaintId]);

  console.log("this is the complaint", complaint);

  const review = async () => {
    // await axios.post(
    //   `${
    //     import.meta.env.VITE_API_URL
    //   }/complaints/complaint/${complaintId}/review`,
    //   { additionalInfo, deadline  }, // Include the additional info in the request body

    //   { params: { complaint:complaint._id, hostID } }
    // );
    await axios.post(
      `${
        import.meta.env.VITE_API_URL
      }/complaints/complaint/${complaintId}/review`
    );
  };
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
          <div className="bg-white p-8 flex items-center border-b">
            {/* <ProgressBar complaint = {complaint}/> */}
          </div>
          <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
            <p>Completed Date</p>
            <p>Proof Uploaded</p>
            <p>technician:</p>
            <p>remaining days</p>
          </div>
          <div className="bg-white p-8 flex items-center">
            <h2 className="text-xl font-bold">
              Additional Comments by the technician{" "}
            </h2>
            <p className="ml-4">No reviews yet.</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Hosted By</h2>
          <div>user1</div>
        </div>
      </div>

      <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-lg">{complaint.description}</p>
        <button
          className="bg-blue-600 text-white p-2 rounded font-bold flex items-center"
          // onClick={review}
          // disabled={isLoading}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
