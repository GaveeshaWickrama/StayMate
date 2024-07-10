import React, { useState, useEffect } from "react";
import TripDetails from "../../components/host/TripDetails";
import TabButtons from "../../components/host/TabButtons";
import { useStore } from "../../context/StoreContext";

const HostReservation = () => {
  const { userReservations } = useStore();
  const [activeTab, setActiveTab] = useState("upcoming");

  // Function to compare two trips by booking date (assuming trip.created_at)
  const compareByBookingDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  // Sort userReservations by booking date descending
  const sortedReservations = [...userReservations].sort(compareByBookingDate);

  return (
    <div className="container mx-auto p-4 mt-[100px] ml-[100px]">
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
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
  );
};

export default HostReservation;
