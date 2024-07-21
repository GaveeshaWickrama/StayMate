import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";

const ReservationSection = ({
  property,
  propertyId,
  nightlyRate,
  initialCheckInDate,
  initialCheckOutDate,
  serviceFeePercentage,
}) => {
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
  const [noOfGuests, setNoOfGuests] = useState(1); // Add state for number of guests
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateNights = (start, end) =>
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
    const calculateServiceFee = (rate, nights, percentage) =>
      rate * nights * (percentage / 100);

    const nights = calculateNights(checkInDate, checkOutDate);
    const fee = calculateServiceFee(nightlyRate, nights, serviceFeePercentage);

    setNights(nights);
    setServiceFee(fee);
    setTotalPrice(nightlyRate * nights + fee);
  }, [checkInDate, checkOutDate, nightlyRate, serviceFeePercentage]);

  const handleReserve = () => {
    navigate(`/user/reserve/${propertyId}`, {
      state: {
        property,
        propertyId,
        checkInDate,
        checkOutDate,
        noOfGuests,
        totalPrice,
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-2xl font-bold mb-4">
        Rs {nightlyRate.toLocaleString()} / Night
      </h2>
      <div className="flex mb-4 space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Check-in
          </label>
          <input
            type="date"
            className="p-2 border rounded"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="mb-2 flex items-center">
            <FaCalendarAlt className="mr-2" /> Check-out
          </label>
          <input
            type="date"
            className="p-2 border rounded"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4 space-x-4">
        <div className="flex flex-col w-1/2">
          <label className="mb-2">Number of Guests</label>
          <input
            type="number"
            className="p-2 border rounded"
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
          />
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
