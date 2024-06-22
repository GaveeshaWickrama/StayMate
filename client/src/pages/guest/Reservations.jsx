import React, { useState } from "react";
import img1 from "../../assets/img1.jpeg";

const TripDetails = ({ trip, isUpcoming }) => (
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
          <button className="font-semibold  text-white text-sm px-4 py-2 bg-red-500 border border-red-500 rounded ml-[150px] mt-[50px]">
            Cancel Reservation
          </button>
        ) : (
          <>
            <span className="font-semibold  text-white text-sm px-4 py-2 bg-green-500  rounded ml-[150px] mt-[50px]">
              Completed
            </span>
            <button
              onClick={() =>
                (window.location.href =
                  "http://localhost:5173/user/reviews/add")
              }
              className="font-semibold  text-white text-sm px-4 py-2 bg-blue-500 mt-[50px]"
            >
              Add Review
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

const Reservation = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingTrips = [
    {
      title: "Premium guest house for rent in Cupertino, CA, USA",
      location: "Chernomorets, Burgas, BG, BG, 10036",
      guests: "4 Adults",
      dates: "06/22/2024 - 06/23/2024",
      price: "2,790.05",
      status: "Approved",
    },
  ];

  const previousTrips = [
    {
      title: "Luxury villa in Malibu, CA, USA",
      location: "Malibu, CA, USA",
      guests: "2 Adults",
      dates: "05/10/2024 - 05/15/2024",
      price: "3,500.00",
      status: "Completed",
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-[100px] ml-[100px]">
      <div className="flex space-x-4 mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "upcoming"
              ? "text-red-500 underline"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming trips
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "previous"
              ? "text-red-500 underline"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous trips
        </button>
      </div>
      <div>
        {activeTab === "upcoming" &&
          upcomingTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} isUpcoming={true} />
          ))}
        {activeTab === "previous" &&
          previousTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} isUpcoming={false} />
          ))}
      </div>
    </div>
  );
};

export default Reservation;
