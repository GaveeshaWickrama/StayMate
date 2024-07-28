import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { FaCalendarCheck } from "react-icons/fa";

const TripDetails = () => {
  const { state } = useLocation();
  const { handleSubmit, fetchPropertyById } = useStore(); // Ensure fetchPropertyById is implemented in StoreContext
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (state && state.propertyId && !state.property) {
      fetchPropertyById(state.propertyId).then((data) => {
        console.log("Fetched property data:", data); // Debugging the response data
        setProperty(data);
      });
    } else {
      setProperty(state.property);
    }
  }, [state, fetchPropertyById]);

  if (!state) {
    return (
      <div className="container mx-auto p-10">
        No trip details available. Please go back and select a trip.
      </div>
    );
  }

  if (!property) {
    return <div className="container mx-auto p-10">Loading...</div>;
  }

  const {
    sectionId,
    propertyId,
    checkInDate,
    checkOutDate,
    noOfGuests,
    totalPrice,
  } = state;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    const reservationData = {
      sectionId,
      propertyId,
      checkInDate,
      checkOutDate,
      noOfGuests,
      totalPrice,
      property,
    };

    console.log("Submitting reservation data:", reservationData); // Log the reservation data

    try {
      await handleSubmit(reservationData);
      console.log("Reservation submitted successfully");
    } catch (error) {
      console.error("Failed to submit reservation:", error);
    }
  };

  return (
    <div className="container mx-auto p-10">
      {/* Title Section */}
      <div className="flex mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaCalendarCheck className="mr-4" />
          Confirm Your Trip
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
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
            <button
              onClick={handleConfirmBooking}
              className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 mt-auto"
            >
              Confirm Booking
            </button>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4">{property.title}</h3>
            <p className="text-gray-700 mb-4">{property.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.images.map((image, index) => {
                const imageUrl = `${import.meta.env.VITE_API_URL}/${image.url}`;
                return (
                  <div key={image._id} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Property Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150"; // Placeholder image if the image fails to load
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
