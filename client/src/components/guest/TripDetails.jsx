import React from "react";
import img1 from "../../assets/img1.jpeg";

const TripDetails = ({ trip, isUpcoming, isOngoing }) => (
  <div className="p-4 border rounded-lg shadow-md mb-4 w-[900px] mt-[50px] ml-[10px] flex">
    <div className="w-1/3">
      <img
        src={img1}
        alt="Property"
        className="w-full h-full object-cover rounded-l-lg"
      />
    </div>
    <div className="w-2/3 p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-md font-semibold ml-[30px]">{trip.title}</h3>
        <p className="text-sm text-gray-600 ml-[30px]">{trip.location}</p>
        <p className="text-sm text-gray-600 ml-[30px]">{trip.dates}</p>
        <p className="text-sm text-gray-600 ml-[30px]">{trip.guests}</p>
        <p className="text-md font-semibold mt-2 ml-[30px]">${trip.price}</p>
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
        ) : (
          <>
            <span className="font-semibold text-white text-sm px-4 py-2 bg-green-500 border border-green-500 rounded ml-[150px] mt-[50px]">
              Completed
            </span>
            <button
              onClick={() =>
                (window.location.href =
                  "http://localhost:5173/user/reviews/add")
              }
              className="font-semibold text-white text-sm px-4 py-2 bg-blue-500 border border-blue-500 rounded mt-[50px]"
            >
              Add Review
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

export default TripDetails;
