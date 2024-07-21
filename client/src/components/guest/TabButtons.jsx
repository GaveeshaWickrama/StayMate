import React from "react";

const TabButtons = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
    <button
      className={`py-2 px-4 ${
        activeTab === "upcoming" ? "text-green-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("upcoming")}
    >
      Upcoming trips
    </button>
    <button
      className={`py-2 px-4 ${
        activeTab === "ongoing" ? "text-green-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("ongoing")}
    >
      Ongoing trips
    </button>
    <button
      className={`py-2 px-4 ${
        activeTab === "completed" ? "text-green-500 underline" : "text-gray-500"
      }`}
      onClick={() => setActiveTab("completed")}
    >
      Previous trips
    </button>
  </div>
);

export default TabButtons;
