import React from "react";
import img1 from "../../assets/profile.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import useCreateOrSelectConversation from "../../hooks/useCreateOrSelectConversation";
import { toast } from "react-toastify";

const TripDetails = ({ trip, isUpcoming, isOngoing, isCompleted }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { createOrSelectConversation } = useCreateOrSelectConversation();
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async () => {
    if (currentUser) {
      setIsLoading(true);
      try {
        await createOrSelectConversation(trip.user._id);
        navigate(`/host/chat`);
      } catch (error) {
        toast.error("Failed to create or select conversation.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("User is not logged in");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-8 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <img
          src={img1}
          alt="Profile"
          className="w-5/6 h-48 object-cover rounded-lg md:rounded-l-lg md:rounded-r-none"
        />
        <p className="text-md font-semibold mt-2">
          {trip.user.firstName} {trip.user.lastName}
        </p>
        {isUpcoming && (
          <button
            onClick={handleMessage}
            className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2"
            disabled={isLoading}
          >
            Chat
          </button>
        )}
      </div>
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
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
          <p className="text-md font-semibold mt-2">
            Payment:{" "}
            {trip.paymentStatus ? (
              <span className="text-green-500">&#9989;</span>
            ) : (
              "Pending"
            )}
          </p>
          <p className="text-md font-semibold mt-2">RS {trip.totalPrice}</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          {isOngoing && (
            <>
              <button
                onClick={handleMessage}
                className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2"
                disabled={isLoading}
              >
                Chat
              </button>
              <button
                onClick={() => (window.location.href = "#")}
                className="font-semibold text-white text-sm px-5 py-2 bg-yellow-500 border border-yellow-500 rounded "
              >
                View Complaints
              </button>
            </>
          )}
          {isCompleted && (
            <span className="font-semibold text-white text-sm px-4 py-2 bg-green-500 border border-green-500 rounded">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
