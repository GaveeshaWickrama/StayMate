import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { FaCalendarAlt, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const TripDetails = () => {
  const { state } = useLocation();
  const { handleSubmit, fetchPropertyById } = useStore();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (state && state.propertyId && !state.property) {
      fetchPropertyById(state.propertyId).then((data) => {
        console.log("Fetched property data:", data);
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

    console.log("Submitting reservation data:", reservationData);

    try {
      await handleSubmit(reservationData);
      console.log("Reservation submitted successfully");
    } catch (error) {
      console.error("Failed to submit reservation:", error);
    }
  };

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

  // Display only the first 3 images
  const displayedImages = property.images.slice(0, 3);

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col items-center mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="text-4xl font-extrabold text-black-600 text-center">
          Confirm Your Trip
        </h1>
      </div>

      {/* Layout with two cards side by side */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Trip Details and Property Images Card */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

          <p className="text-gray-700 mb-2 flex justify-center md:justify-start items-center">
            <FaCalendarAlt className="mr-2" />
            <strong>Check-In:</strong> {checkInDate}
          </p>
          <p className="text-gray-700 mb-2 flex justify-center md:justify-start items-center">
            <FaCalendarAlt className="mr-2" />
            <strong>Check-Out:</strong> {checkOutDate}
          </p>
          <p className="text-gray-700 mb-2 flex justify-center md:justify-start items-center">
            <FaUsers className="mr-2" />
            <strong>Guests:</strong> {noOfGuests}
          </p>

          <p className="text-gray-700 mb-2 flex justify-center md:justify-start items-center text-lg">
            <span className="font-bold">{property.title}</span>
          </p>

          {/* Property Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {displayedImages.map((image, index) => {
              const imageUrl = `${import.meta.env.VITE_API_URL}/${image.url}`;
              return (
                <div key={image._id} className="relative">
                  <img
                    src={imageUrl}
                    alt={`Property Image ${index + 1}`}
                    className="w-full h-32 md:h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/600x400";
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Total Price and Pay Now Button Card */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3 flex flex-col items-center mt-[100px]">
          <h2 className="text-2xl font-bold mb-4 flex items-center mt-[30px]">
            <FaMoneyBillWave className="mr-2 text-green-600" />
            Total Price
          </h2>
          <p className="text-gray-700 mb-4 text-3xl font-bold">
            {formatPrice(totalPrice)}
          </p>
          <button
            onClick={handleConfirmBooking}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full mt-[20px]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
