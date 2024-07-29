import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import {
  FaCalendarCheck,
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";

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

  // Function to format the price
  const formatPrice = (price) => {
    return price
      .toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace("LKR", "RS");
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

      <div className="flex flex-col md:flex-row gap-6">
        {/* Trip Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold mb-4">Trip Details</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col md:w-1/2">
              <p className="text-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                <strong>Check-In:</strong> {checkInDate}
              </p>
              <p className="text-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                <strong>Check-Out:</strong> {checkOutDate}
              </p>
              <p className="text-gray-700 mb-2 flex items-center">
                <FaUsers className="mr-2" />
                <strong>Guests:</strong> {noOfGuests}
              </p>
            </div>
            <div className="flex flex-col md:w-1/2">
              <h3 className="text-xl font-bold mb-4">{property.title}</h3>
              <p className="text-gray-700 mb-4">{property.description}</p>
            </div>
          </div>
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

        {/* Payment Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-600" />
            Total to Pay
          </h2>
          <p className="text-gray-700 mb-4 text-3xl font-bold mt-auto">
            {formatPrice(totalPrice)}
          </p>
          <button
            onClick={handleConfirmBooking}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full mt-auto"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
