import React, { useState } from "react";
import Revenue from "./Reports/Revenue";
import PropertyReport from "./Reports/Property"; // Import the PropertyReport component

function Report() {
  const [selectedView, setSelectedView] = useState("revenue");

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold py-8 text-center">Report Dashboard</h3>

      {/* Navigation Bar */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedView("revenue")}
          className={`px-4 py-2 ${
            selectedView === "revenue" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded transition duration-200 ease-in-out`}
        >
          Cash Flow
        </button>
        <button
          onClick={() => setSelectedView("property")}
          className={`px-4 py-2 ${
            selectedView === "property" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded transition duration-200 ease-in-out`}
        >
          Property
        </button>
      </div>

      {/* Render Selected View */}
      <div className="bg-white p-5 rounded-lg shadow-md">
        {selectedView === "revenue" && <Revenue />}
        {selectedView === "property" && <PropertyReport />}
      </div>
    </main>
  );
}

export default Report;
