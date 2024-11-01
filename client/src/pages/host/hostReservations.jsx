import React, { useState } from "react";
import TripDetails from "../../components/host/TripDetails";
import TabButtons from "../../components/host/TabButtons";
import { useStore } from "../../context/StoreContext";

const HostReservation = () => {
  const { userReservations } = useStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedProperty, setSelectedProperty] = useState("all");

  // Function to compare two trips by booking date (assuming trip.createdAt)
  const compareByBookingDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  // Sort userReservations by booking date descending
  const sortedReservations = [...userReservations].sort(compareByBookingDate);

  // Get unique property titles
  const propertyTitles = [
    "all",
    ...new Set(userReservations.map((trip) => trip.property.title)),
  ];

  // Filter reservations based on the selected property and active tab
  const filteredReservations = sortedReservations.filter((trip) => {
    const isActiveTab = trip.status === activeTab;
    const isSelectedProperty =
      selectedProperty === "all" || trip.property.title === selectedProperty;
    return isActiveTab && isSelectedProperty;
  });

  return (
    <div className="container mx-auto p-4 mt-8">
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          <label
            htmlFor="propertyFilter"
            className="block md:inline-block md:mr-4 font-medium text-gray-700"
          >
            Filter by property:
          </label>
          <select
            id="propertyFilter"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="mt-1 md:mt-0 block w-full md:w-auto py-2 px-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {propertyTitles.map((title, index) => (
              <option key={index} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredReservations.map((trip, index) => (
          <TripDetails
            key={index}
            trip={trip}
            isUpcoming={activeTab === "upcoming"}
            isOngoing={activeTab === "ongoing"}
            isCompleted={activeTab === "completed"}
          />
        ))}
      </div>
    </div>
  );
};

export default HostReservation;
