import React from 'react';

const ProgressBar = ({ stage, totalStages, sidebarWidth, handlePrevious, handleNext, isFormValid }) => {
  const progressPercentage = (stage / totalStages) * 100;

  return (
    <div className="w-full bg-blue-100 relative">
      <div className="relative bottom-2 w-full h-4 bg-gray-200 mt-2">
         <div className="absolute top-0 left-0 h-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow-md transition-all duration-500" style={{ width: `${progressPercentage}%` }} ></div> 
      </div>
      <div className="flex justify-between mt-4 px-6">
        <button type="button" onClick={handlePrevious} className="bg-gray-300 text-black px-4 py-2 mb-4 rounded" disabled={stage === 1} > Previous </button>
        <button type="button" onClick={handleNext} className={`px-4 py-2 mb-4 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`} > Next </button>
      </div>
    </div>
  );
};

export default ProgressBar;
