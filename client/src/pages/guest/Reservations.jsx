import React, { useState } from "react";
import trip_image from "../../assets/profile.jpg";

const TripDetails = ({ trip }) => (
  <div className="p-4 border rounded-lg shadow-md mb-4 w-[900px] mt-[50px] ml-[10px]">
    <div className="flex items-center">
      <img
        src={trip_image}
        alt="Profile"
        className="w-24 h-24 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">{trip.name}</h2>
            <p className="text-sm text-gray-600">{trip.email}</p>
            <p className="text-sm text-gray-600">{trip.phone}</p>
            <button className="text-blue-500 text-sm">Chat</button>
          </div>
          <div className="text-right mr-[50px]">
            <h3 className="text-md font-semibold">{trip.title}</h3>
            <p className="text-sm text-gray-600">{trip.location}</p>
            <p className="text-sm text-gray-600">{trip.dates}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center mr-[100px]">
          <span
            className={`font-semibold ${
              trip.status === "Approved" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trip.status}
          </span>
          <p className="text-md font-semibold">${trip.price}</p>
          <button className="flex items-center text-blue-500 text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
            More
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Reservation = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingTrips = [
    {
      name: "Marry",
      email: "qa@radicalstart.com",
      phone: "8526321098",
      image: "https://via.placeholder.com/150",
      title: "Premium guest house for rent in Cupertino, CA, USA",
      location: "Chernomorets, Burgas, BG, BG, 10036",
      dates: "06/22/2024 - 06/23/2024",
      price: "2,790.05",
      status: "Approved",
    },
  ];

  const previousTrips = [
    {
      name: "John",
      email: "john@example.com",
      phone: "1234567890",
      image: "https://via.placeholder.com/150",
      title: "Luxury villa in Malibu, CA, USA",
      location: "Malibu, CA, USA",
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
            <TripDetails key={index} trip={trip} />
          ))}
        {activeTab === "previous" &&
          previousTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} />
          ))}
      </div>
    </div>
  );
};

export default Reservation;
