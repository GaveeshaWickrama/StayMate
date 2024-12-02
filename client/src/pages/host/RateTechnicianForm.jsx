import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShower,
  FaStar,
} from "react-icons/fa";
import { StarRating } from "./components/StarRating";
import { useAuth } from "../../context/auth";

export default function RateTechnicianForm({ isOpen, handleClose, complaint }) {
  if (!isOpen) return null;

  const { currentUser, loading } = useAuth();

  const [currentRating, setCurrentRating] = useState(0);
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  // const rating = async (rating) => {
  //   console.log("the rating received by the parent component:", rating);
  // };\\
  console.log("this is the complaint", complaint);
  console.log("this is the review",review);
  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    console.log("updated rating receive by the star component", newRating);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        technicianId: complaint.technicianId,
        currentRating, //required
        review: review.trim() || null,
        userId: currentUser.id,
      };

      // console.log("rating received by the parent component:",currentRating);
      // console.log("technician review",review);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints/rate`,
        payload
      );
      console.log("Rating and review submitted successfully:", response.data);
      navigate("/host/manage-complaints");
    } catch (error) {
      console.error("error submitting the rating", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Rate Technician</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <div className="md:flex md:flex-row space-x-1.5">
              <label className="block text-lg font-medium text-gray-700 py-3">
                Rate
                <StarRating onRatingChange={handleRatingChange} />
              </label>

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
                  <h2>{complaint.technician.subRole}</h2>
                  <div className="text-gray-500 mb-4">
                    Joined on <br /> 2021-06-15
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <label className="block text-lg font-medium text-gray-700 py-3">
              Review (Optional)
            </label>
            <textarea
              className="focus:outline-none mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              name="review"
              placeholder="Write a review for the technician"
              // value = {resolveComments}
              // onChange={(e) => setResolveComments(e.target.value)}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
