import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

const ReservationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property } = location.state;

  const handleBackClick = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="flex mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <FontAwesomeIcon
            icon={faClipboardList}
            className="mr-4 text-blue-500 text-3xl"
          />
          Reservation Details
        </h2>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className="text-blue-500 hover:text-blue-700 underline mb-4"
          >
            &larr; Back
          </button>
        </div>
        <div className="flex mb-6">
          <img
            src={`${import.meta.env.VITE_API_URL}/${property.images[0].url}`}
            alt={property.title}
            className="w-64 h-64 object-cover rounded mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-xl mb-2">
              Hosted by: {property.host_id.firstName}{" "}
              {property.host_id.lastName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Description:</strong> {property.description}
            </p>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Type:</strong> {property.type}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reservations</h2>
          {property.reservations.map((reservation, index) => (
            <div
              key={reservation._id}
              className="mb-4 p-4 border rounded-lg bg-gray-50"
            >
              <h3 className="text-xl font-bold mb-2">
                Reservation {index + 1}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Check-in Date:</strong>{" "}
                  {format(new Date(reservation.checkInDate), "MMMM d, yyyy")}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Check-out Date:</strong>{" "}
                  {format(new Date(reservation.checkOutDate), "MMMM d, yyyy")}
                </p>
                <p className="text-lg text-gray-700 mb-1">
                  <strong>Total Price:</strong> {reservation.totalPrice}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Guest:</strong> {reservation.user.firstName}{" "}
                  {reservation.user.lastName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
