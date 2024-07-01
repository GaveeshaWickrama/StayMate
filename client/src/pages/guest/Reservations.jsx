import React, { useState } from "react";
import TripDetails from "../../components/guest/TripDetails";
import TabButtons from "../../components/guest/TabButtons";

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

  const ongoingTrips = [
    {
      title: "Beach house in Miami, FL, USA",
      location: "Miami, FL, USA",
      guests: "3 Adults",
      dates: "06/25/2024 - 07/01/2024",
      price: "4,200.00",
      status: "Ongoing",
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
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        {activeTab === "upcoming" &&
          upcomingTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} isUpcoming={true} />
          ))}
        {activeTab === "ongoing" &&
          ongoingTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} isOngoing={true} />
          ))}
        {activeTab === "completed" &&
          previousTrips.map((trip, index) => (
            <TripDetails key={index} trip={trip} isUpcoming={false} />
          ))}
      </div>
    </div>
  );
};

export default Reservation;
