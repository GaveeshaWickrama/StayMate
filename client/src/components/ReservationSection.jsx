import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import CustomCalendar from "./CustomCalendar";

const ReservationSection = ({
  property,
  propertyId,
  sectionId,
  nightlyRate,
  initialCheckInDate,
  initialCheckOutDate,
  serviceFeePercentage,
}) => {
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateNights = (start, end) =>
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    const calculateServiceFee = (rate, nights, percentage) =>
      rate * nights * (percentage / 100);

    if (
      checkInDate &&
      checkOutDate &&
      !errors.checkInDate &&
      !errors.checkOutDate
    ) {
      const nights = calculateNights(checkInDate, checkOutDate);
      const fee = calculateServiceFee(
        nightlyRate,
        nights,
        serviceFeePercentage
      );

      setNights(nights);
      setServiceFee(fee);
      setTotalPrice(nightlyRate * nights + fee);
    }
  }, [checkInDate, checkOutDate, nightlyRate, serviceFeePercentage, errors]);

  const validateDates = () => {
    let errors = {};
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0)); // Set to today's date at midnight
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Check if the check-in date is before today
    if (checkIn < today) {
      errors.checkInDate = "Check-in date cannot be in the past.";
    }

    // Check if check-out date is before or on the check-in date
    if (checkOut <= checkIn) {
      errors.checkOutDate = "Check-out date must be after check-in date.";
    }

    // Check if the check-in or check-out dates are invalid
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      errors.checkInDate = "Invalid check-in date.";
      errors.checkOutDate = "Invalid check-out date.";
    }

    // If there are any errors, set them in the state and return false
    if (errors.checkInDate || errors.checkOutDate) {
      setErrors(errors);
      return false;
    }

    // If no errors, clear any existing errors and return true
    setErrors({});
    return true;
  };

  const validateGuests = () => {
    let errors = {};
    if (noOfGuests < 1 || noOfGuests > 100) {
      // Assuming 100 as a reasonable upper limit
      errors.noOfGuests = "Number of guests must be between 1 and 100.";
    }
    if (errors.noOfGuests) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        noOfGuests: errors.noOfGuests,
      }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, noOfGuests: undefined }));
    return true;
  };

  const handleReserve = () => {
    if (validateDates() && validateGuests()) {
      navigate(`/user/reserve/${propertyId}`, {
        state: {
          property,
          propertyId,
          sectionId,
          checkInDate,
          checkOutDate,
          noOfGuests,
          totalPrice,
        },
      });
    }
  };

  const handleDateRangeSelect = (startDate, endDate) => {
    setCheckInDate(startDate.toLocaleDateString("en-CA")); // Local date format (YYYY-MM-DD)
    setCheckOutDate(endDate.toLocaleDateString("en-CA")); // Local date format (YYYY-MM-DD)
    setShowCalendar(false); // Hide calendar after selection
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mt-6 flex space-x-6">
      {/* Left Column */}
      <div className="w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Rs {nightlyRate.toLocaleString()} / Night
        </h2>

        <div className="mb-6">
          <div className="flex flex-col relative">
            <label className="mb-3 text-lg font-semibold flex items-center text-gray-600">
              <FaCalendarAlt className="mr-2 text-gray-500" /> Check-in /
              Check-out
            </label>
            <input
              type="text"
              readOnly
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.checkInDate ? "border-red-500" : "border-gray-300"
              }`}
              value={`${checkInDate || ""} - ${checkOutDate || ""}`}
              onClick={() => setShowCalendar(!showCalendar)}
            />
            {showCalendar && (
              <CustomCalendar
                propertyId={propertyId}
                sectionId={sectionId}
                onDateRangeSelect={handleDateRangeSelect}
                startDate={checkInDate}
                endDate={checkOutDate}
                onClose={handleCloseCalendar}
              />
            )}
            {(errors.checkInDate || errors.checkOutDate) && (
              <p className="text-red-500 text-sm mt-2">
                {errors.checkInDate || errors.checkOutDate}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-col">
            <label className="mb-3 text-lg font-semibold text-gray-600">
              Number of Guests
            </label>
            <input
              type="number"
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.noOfGuests ? "border-red-500" : "border-gray-300"
              }`}
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(parseInt(e.target.value, 10))}
              min={1}
            />
            {errors.noOfGuests && (
              <p className="text-red-500 text-sm mt-2">{errors.noOfGuests}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 flex flex-col">
        <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 mb-6 mt-2">
          <div className="flex justify-between items-center mb-4">
            <span className="flex items-center text-gray-700">
              <FaMoneyBillWave className="mr-2 text-gray-500" /> Rs{" "}
              {nightlyRate.toLocaleString()} x {nights} nights
            </span>
            <span className="text-gray-800 font-semibold">
              Rs {(nightlyRate * nights).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="flex items-center text-gray-700">
              <FaInfoCircle className="mr-2 text-gray-500" /> Service fee
            </span>
            <span className="text-gray-800 font-semibold">
              Rs {serviceFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center font-bold border-t pt-4 border-gray-300">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-900 text-lg">
              Rs {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
        <button
          className="bg-blue-600 text-white p-4 rounded-lg font-bold w-full hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleReserve}
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default ReservationSection;
