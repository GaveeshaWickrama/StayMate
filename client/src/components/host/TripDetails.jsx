import React from "react";
import img1 from "../../assets/profile.jpg";

const TripDetails = ({ trip, isUpcoming, isOngoing, isCompleted }) => {
  const getUsernameFromEmail = (email) => {
    return email.split("@")[0]; // Splitting the email at "@" and taking the first part
  };

  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 w-[900px] mt-[50px] ml-[10px] flex">
      <div className="w-1/3 flex flex-col items-center">
        <img
          src={img1}
          alt="Profile"
          className="w-5/6 h-48 object-cover rounded-l-lg"
        />
        <p className="text-md font-semibold mt-2">
          {getUsernameFromEmail(trip.user.email)}
        </p>{" "}
        {/* Assuming trip has user information */}
        {isUpcoming && (
          <button
            onClick={() => (window.location.href = "#")}
            className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-4 mb-[20px] ml-[250px]"
          >
            Chat
          </button>
        )}
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-md font-semibold ml-[30px]">
            {trip.property.title}
          </h3>
          <p className="text-sm text-gray-600 ml-[30px]">
            {trip.property.location.city}
          </p>
          <p className="text-sm text-gray-600 ml-[30px]">
            {new Date(trip.checkInDate).toLocaleDateString()} -{" "}
            {new Date(trip.checkOutDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600 ml-[30px]">
            {trip.noOfGuests} {trip.noOfGuests === 1 ? "Guest" : "Guests"}
          </p>
          <p className="text-md font-semibold mt-2 ml-[30px]">
            RS {trip.totalPrice}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          {isUpcoming ? (
            <button className="font-semibold text-white text-sm px-4 py-2 bg-red-500 border border-red-500 rounded ml-[150px] mt-[50px]">
              Cancel Reservation
            </button>
          ) : isOngoing ? (
            <>
              <button
                onClick={() => (window.location.href = "#")}
                className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded ml-[150px] mt-[50px]"
              >
                Chat
              </button>
              <button
                onClick={() => (window.location.href = "#")}
                className="font-semibold text-white text-sm px-6 py-2 bg-yellow-500 border border-yellow-500 rounded mt-[50px]"
              >
                Add Complaint
              </button>
            </>
          ) : isCompleted ? (
            <>
              <span className="font-semibold text-white text-sm px-4 py-2 bg-green-500 border border-green-500 rounded ml-[150px] mt-[50px]">
                Completed
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
