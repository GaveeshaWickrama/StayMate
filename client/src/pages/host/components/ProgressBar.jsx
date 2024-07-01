import React from 'react';

const ProgressBar = ({ stage, totalStages, sidebarWidth, handlePrevious, handleNext, isFormValid }) => {
  const progressPercentage = (stage / totalStages) * 100;

  return (
    <div className="pb-10 w-full bg-gray-900 overflow-hidden">
      <div className="relative left-1 h-3 bg-gray-200 rounded-full ">
        <div
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="absolute top-0 left-0 h-3 w-full flex justify-between">
          {Array(totalStages - 1).fill().map((_, i) => (
            <div key={i} className="h-full w-1 bg-white" style={{ marginLeft: `${((i + 1) * 100) / totalStages}%` }}></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4 px-8">
        <button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={stage === 1}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={`px-4 py-2 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isFormValid || stage === totalStages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
