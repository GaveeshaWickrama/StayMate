import React from "react";
import { useLocation } from "react-router-dom";
import { useReservation } from "../../context/ReservationContext";

const TripDetails = () => {
  const { state } = useLocation();
  const { handleSubmit } = useReservation();

  if (!state) {
    return (
      <div className="container mx-auto p-10">
        No trip details available. Please go back and select a trip.
      </div>
    );
  }

  const {
    property,
    propertyId,
    checkInDate,
    checkOutDate,
    noOfGuests,
    totalPrice,
  } = state;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const reservationData = {
      propertyId,
      checkInDate,
      checkOutDate,
      noOfGuests,
      totalPrice,
      property,
    };

    handleSubmit(reservationData);
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8">
        Confirm Your Trip
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

        <p className="text-gray-700 mb-2">
          <strong>Check-In:</strong> {checkInDate}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Check-Out:</strong> {checkOutDate}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Guests:</strong> {noOfGuests}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Total Price:</strong> RS {totalPrice}
        </p>
        {/* Add confirmation button or additional functionality as needed */}
        <button
          onClick={handleConfirmBooking}
          className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
