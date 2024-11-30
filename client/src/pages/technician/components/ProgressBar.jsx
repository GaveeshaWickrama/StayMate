

import React from "react";

const ProgressBar = ({ complaint }) => {
  // Define the actual statuses and custom milestone names
  const milestones = [
    { status: "pendingHostDecision", label: "Pending Host Decision" },
    { status: "pendingTechnicianApproval", label: "Pending Technician Approval" },
    { status: "active", label: "Active" },
    { status: "technicianCompleted", label: "Technician Completed" },
    { status: "jobCompleted", label: "Job Completed" },
  ];

  // Determine the current step based on the complaint status
  const currentStep = milestones.findIndex((milestone) => milestone.status === complaint.status);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 w-full max-w-full mx-auto rounded-lg shadow-md">
      <div className="w-full">
        {/* Milestone Texts */}
        <div className="flex justify-between w-full mb-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center"
              style={{ padding: "0 10px" }}
            >
              <div
                className={`text-sm text-center ${
                  index <= currentStep ? "text-blue-500" : "text-gray-500"
                }`}
              >
                <div style={{ wordWrap: "break-word", maxWidth: "80px" }}>
                  {/* Wrap long texts */}
                  {milestone.label.split(" ").map((word, idx) => (
                    <span key={idx}>
                      {word}
                      {idx < milestone.label.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-300 rounded-full">
          {/* Progress Bar Fill */}
          <div
            className="absolute top-0 left-0 h-3 bg-blue-500 rounded-full transition-all"
            style={{
               width: `${(currentStep / (milestones.length - 1)) * 100}%`
            }}
          ></div>

          {/* Milestone Markers */}
          {milestones.map((_, index) => (
            <div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"
              style={{
                left: `${(index / (milestones.length - 1)) * 100}%`, // Place markers evenly
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
