import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import CustomCalendar from './CustomCalendar';

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

    if (checkInDate && checkOutDate && !errors.checkInDate && !errors.checkOutDate) {
      const nights = calculateNights(checkInDate, checkOutDate);
      const fee = calculateServiceFee(nightlyRate, nights, serviceFeePercentage);

      setNights(nights);
      setServiceFee(fee);
      setTotalPrice(nightlyRate * nights + fee);
    }
  }, [checkInDate, checkOutDate, nightlyRate, serviceFeePercentage, errors]);

  const validateDates = () => {
    let errors = {};
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < now) {
      errors.checkInDate = "Check-in date cannot be in the past.";
    }
    if (checkOut <= checkIn) {
      errors.checkOutDate = "Check-out date must be after check-in date.";
    }
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      errors.checkInDate = "Invalid check-in date.";
      errors.checkOutDate = "Invalid check-out date.";
    }
    if (errors.checkInDate || errors.checkOutDate) {
      setErrors(errors);
      return false;
    }

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

  const handleCheckInDateSelect = (date) => {
    setCheckInDate(date.toISOString().split('T')[0]);
    setShowCalendar(false); // Hide calendar after selection
  };

  const handleCheckOutDateSelect = (date) => {
    setCheckOutDate(date.toISOString().split('T')[0]);
    setShowCalendar(false); // Hide calendar after selection
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">
        Rs {nightlyRate.toLocaleString()} / Night
      </h2>

      <div className="flex mb-4 space-x-4">
        <div className="flex flex-col w-1/2 relative">
          <label className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Check-in
          </label>
          <input
            type="text"
            readOnly
            className={`p-2 border rounded ${
              errors.checkInDate ? "border-red-500" : ""
            }`}
            value={checkInDate || ""}
            onClick={() => setShowCalendar(!showCalendar)}
          />
          {showCalendar && (
            <CustomCalendar
              propertyId={propertyId}
              sectionId={sectionId}
              onDateSelect={handleCheckInDateSelect}
              startDate={checkInDate}
              endDate={checkOutDate}
            />
          )}
          {errors.checkInDate && (
            <p className="text-red-500 text-sm">{errors.checkInDate}</p>
          )}
        </div>

        <div className="flex flex-col w-1/2 relative">
          <label className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Check-out
          </label>
          <input
            type="text"
            readOnly
            className={`p-2 border rounded ${
              errors.checkOutDate ? "border-red-500" : ""
            }`}
            value={checkOutDate || ""}
            onClick={() => setShowCalendar(!showCalendar)}
            disabled={!checkInDate} // Disable until check-in date is selected
          />
          {showCalendar && (
            <CustomCalendar
              propertyId={propertyId}
              sectionId={sectionId}
              onDateSelect={handleCheckOutDateSelect}
              startDate={checkInDate}
              endDate={checkOutDate}
            />
          )}
          {errors.checkOutDate && (
            <p className="text-red-500 text-sm">{errors.checkOutDate}</p>
          )}
        </div>
      </div>

      <div className="flex mb-4 space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2">Number of Guests</label>
          <input
            type="number"
            className={`p-2 border rounded ${
              errors.noOfGuests ? "border-red-500" : ""
            }`}
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(parseInt(e.target.value, 10))}
            min={1}
          />
          {errors.noOfGuests && (
            <p className="text-red-500 text-sm">{errors.noOfGuests}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="w-1/2 p-4 border rounded">
          <div className="flex justify-between items-center mt-4">
            <span className="flex items-center">
              <FaMoneyBillWave className="mr-2" /> Rs{" "}
              {nightlyRate.toLocaleString()} x {nights} nights
            </span>
            <span>Rs {(nightlyRate * nights).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center">
              <FaInfoCircle className="mr-2" /> Service fee
            </span>
            <span>Rs {serviceFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center mt-4 font-bold border-t pt-2">
            <span>Total</span>
            <span>Rs {totalPrice.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center w-1/2 ml-4">
          <button
            className="bg-blue-600 text-white p-4 rounded font-bold w-full my-10"
            onClick={handleReserve}
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;
