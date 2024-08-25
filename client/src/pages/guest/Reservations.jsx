import React, { useState } from "react";
import TripDetails from "../../components/guest/TripDetails";
import TabButtons from "../../components/guest/TabButtons";
import { useStore } from "../../context/StoreContext";
import { MdEventAvailable } from "react-icons/md";

const Reservation = () => {
  const { userReservations } = useStore();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Function to compare two trips by booking date (assuming trip.created_at)
  const compareByBookingDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  // Sort userReservations by booking date descending
  const sortedReservations = [...userReservations].sort(compareByBookingDate);
  console.log(sortedReservations);

  return (
    <div className="container mx-auto p-4 mt-1 ml-4">
      {/* Title Section */}
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <MdEventAvailable className="mr-4" />
          Reservations
        </h1>
      </div>

      <div className="mx-4 mt-7 ml-[50px]">
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6">
          {activeTab === "upcoming" &&
            sortedReservations
              .filter((trip) => trip.status === "upcoming")
              .map((trip, index) => (
                <TripDetails key={index} trip={trip} isUpcoming={true} />
              ))}
          {activeTab === "ongoing" &&
            sortedReservations
              .filter((trip) => trip.status === "ongoing")
              .map((trip, index) => (
                <TripDetails key={index} trip={trip} isOngoing={true} />
              ))}
          {activeTab === "completed" &&
            sortedReservations
              .filter((trip) => trip.status === "completed")
              .map((trip, index) => (
                <TripDetails key={index} trip={trip} isCompleted={true} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
