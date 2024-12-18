import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img1.jpeg";
import { useAuth } from "../../context/auth";
import useCreateOrSelectConversation from "../../hooks/useCreateOrSelectConversation";
import { toast } from "react-toastify";

const TripDetails = ({ trip, isUpcoming, isOngoing, isCompleted }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { createOrSelectConversation } = useCreateOrSelectConversation();
  const [isLoading, setIsLoading] = useState(false);

  console.log(trip);
  console.log(trip.property.host_id);

  const handleAddReview = () => {
    navigate(`/user/reviews/add?reservationId=${trip._id}`);
  };

  const handleMessageHost = async () => {
    if (currentUser) {
      setIsLoading(true);
      try {
        await createOrSelectConversation(trip.property.host_id);
        navigate(`/user/chat`);
      } catch (error) {
        toast.error("Failed to create or select conversation.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("User is not logged in");
    }
  };

  const handleAddComplaint = async () => {
    navigate(`/user/complaints/add?reservationId=${trip._id}`);
  };

  // Construct the image URL using the API base URL and the image path
  const imageUrl =
    trip.property.images.length > 0
      ? `${import.meta.env.VITE_API_URL}/${trip.property.images[0].url}`
      : img1; // Use local image as fallback

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 mt-12 mx-2 md:mx-auto md:w-3/4 flex flex-col md:flex-row ">
      <div className="md:w-1/3 mb-4 md:mb-0">
        <img
          src={imageUrl}
          alt="Property"
          className="w-full h-48 object-cover rounded-l-lg"
        />
      </div>
      <div className="md:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold">{trip.property.title}</h3>
          <p className="text-sm text-gray-600">{trip.property.location.city}</p>
          <p className="text-sm text-gray-600">
            {new Date(trip.checkInDate).toLocaleDateString()} -{" "}
            {new Date(trip.checkOutDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            {trip.noOfGuests} {trip.noOfGuests === 1 ? "Guest" : "Guests"}
          </p>
          <p className="text-md font-semibold mt-2">RS {trip.totalPrice}</p>
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
          {isUpcoming ? (
            <>
              <button
                onClick={handleMessageHost}
                className="font-semibold text-white text-sm px-10 py-2 bg-green-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2"
                disabled={isLoading}
              >
                Chat
              </button>
            </>
          ) : isOngoing ? (
            <>
              <button
                onClick={handleMessageHost}
                className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2"
                disabled={isLoading}
              >
                Chat
              </button>

              <button
                onClick={handleAddComplaint}
                className="font-semibold text-white text-sm px-6 py-2 bg-yellow-500 border border-yellow-500 rounded mt-2 md:mt-0 md:ml-2"
                disabled={isLoading}
              >
                Add Complaint
              </button>
            </>
          ) : isCompleted ? (
            <>
              <span className="font-semibold text-white text-sm px-4 py-2 bg-green-500 border border-green-500 rounded mt-2 md:mt-0">
                Completed
              </span>
              <button
                onClick={handleAddReview}
                className="font-semibold text-white text-sm px-4 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2"
              >
                Add Review
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
