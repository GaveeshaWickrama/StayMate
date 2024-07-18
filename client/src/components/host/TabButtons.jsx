import React from "react";

const TabButtons = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-wrap justify-center space-x-0 md:space-x-4 mb-4">
    <button
      className={`py-2 px-4 w-full md:w-auto ${
        activeTab === "upcoming" ? "text-red-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("upcoming")}
    >
      Upcoming trips
    </button>
    <button
      className={`py-2 px-4 w-full md:w-auto ${
        activeTab === "ongoing" ? "text-red-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("ongoing")}
    >
      Ongoing trips
    </button>
    <button
      className={`py-2 px-4 w-full md:w-auto ${
        activeTab === "completed" ? "text-red-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("completed")}
    >
      Previous trips
    </button>
  </div>
);

export default TabButtons;
