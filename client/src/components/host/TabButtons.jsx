import React from "react";

const TabButtons = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
    {/* Button for Upcoming trips */}
    <button
      className={`py-2 px-4 rounded-lg ${
        activeTab === "upcoming"
          ? "bg-green-500 text-white" // Active tab styles: green background, white text
          : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Inactive tab styles: gray background, gray text, and hover effect
      }`}
      onClick={() => setActiveTab("upcoming")}
    >
      Upcoming trips
    </button>

    {/* Button for Ongoing trips */}
    <button
      className={`py-2 px-4 rounded-lg ${
        activeTab === "ongoing"
          ? "bg-green-500 text-white" // Active tab styles: green background, white text
          : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Inactive tab styles: gray background, gray text, and hover effect
      }`}
      onClick={() => setActiveTab("ongoing")}
    >
      Ongoing trips
    </button>

    {/* Button for Previous trips */}
    <button
      className={`py-2 px-4 rounded-lg ${
        activeTab === "completed"
          ? "bg-green-500 text-white" // Active tab styles: green background, white text
          : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Inactive tab styles: gray background, gray text, and hover effect
      }`}
      onClick={() => setActiveTab("completed")}
    >
      Previous trips
    </button>
  </div>
);

export default TabButtons;
