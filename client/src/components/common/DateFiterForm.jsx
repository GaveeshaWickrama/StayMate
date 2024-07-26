import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilterForm = ({ onDateFilterChange, onClear }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleApply = () => {
    onDateFilterChange({ startDate, endDate });
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onClear();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 w-full max-w-4xl ml-[50px]">
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="text-gray-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Filter Dates</h3>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="flex-1">
          <label className="block text-gray-600 text-sm mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex-1">
          <label className="block text-gray-600 text-sm mb-1">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-red-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilterForm;
