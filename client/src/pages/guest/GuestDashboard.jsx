import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaCalendarAlt,
  FaStar,
  FaComments,
  FaBook,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function GuestDashboard() {
  const { userReservations, loading } = useStore();
  const [date, setDate] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter upcoming reservations
  const upcomingReservations = userReservations.filter(
    (reservation) => reservation.status === "upcoming"
  );

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleNext = () => {
    if (currentIndex < upcomingReservations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  // Extract check-in dates
  const checkInDates = upcomingReservations.map((reservation) =>
    new Date(reservation.checkInDate).toDateString()
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Dashboard</h1>

      <div className="mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h2 className="flex items-center text-2xl font-semibold text-gray-800">
          <FaCalendarAlt className="mr-4 text-blue-500 text-3xl" />
          Upcoming Reservations
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row mb-6 gap-6">
        <div className="lg:w-1/2">
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date, view }) => {
              if (
                view === "month" &&
                checkInDates.includes(date.toDateString())
              ) {
                return "bg-red-500 text-white font-bold";
              }
            }}
            tileContent={({ date, view }) => {
              if (
                view === "month" &&
                checkInDates.includes(date.toDateString())
              ) {
                return (
                  <div className="text-sm text-white font-bold">
                    {upcomingReservations.find(
                      (reservation) =>
                        new Date(reservation.checkInDate).toDateString() ===
                        date.toDateString()
                    ) && (
                      <p className="text-xs bg-red-500 rounded-full p-1 border border-red-300">
                        {
                          upcomingReservations.find(
                            (reservation) =>
                              new Date(
                                reservation.checkInDate
                              ).toDateString() === date.toDateString()
                          ).property.name
                        }
                      </p>
                    )}
                  </div>
                );
              }
            }}
          />
        </div>

        <div className="lg:w-1/2">
          {upcomingReservations.length === 0 ? (
            <div className="bg-white p-6 rounded-md shadow-sm">
              <p className="text-gray-600">No upcoming reservations.</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-md shadow-sm relative">
              <h3 className="text-xl font-semibold mb-4">
                Your Upcoming Reservations
              </h3>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevious}
                  className="text-gray-600 hover:text-gray-900 transition"
                  disabled={currentIndex === 0}
                >
                  <FaArrowLeft size={24} />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-gray-700">
                    <strong>Property:</strong>{" "}
                    {upcomingReservations[currentIndex].property.title}
                  </p>
                  <p className="text-gray-700">
                    <strong>Check-In:</strong>{" "}
                    {new Date(
                      upcomingReservations[currentIndex].checkInDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Check-Out:</strong>{" "}
                    {new Date(
                      upcomingReservations[currentIndex].checkOutDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <strong>Guests:</strong>{" "}
                    {upcomingReservations[currentIndex].noOfGuests}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Price:</strong> Rs{" "}
                    {upcomingReservations[
                      currentIndex
                    ].totalPrice.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className="text-gray-600 hover:text-gray-900 transition"
                  disabled={currentIndex === upcomingReservations.length - 1}
                >
                  <FaArrowRight size={24} />
                </button>
              </div>
              <div className="flex overflow-x-auto gap-2">
                {upcomingReservations[currentIndex].property.images
                  .slice(0, 3)
                  .map((image, index) => {
                    const imageUrl = `${import.meta.env.VITE_API_URL}/${
                      image.url
                    }`;
                    return (
                      <div
                        key={image._id}
                        className="flex-shrink-0 w-32 h-20 relative"
                      >
                        <img
                          src={imageUrl}
                          alt={`Property Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150"; // Placeholder image
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-around mt-6">
        <div className="text-center">
          <Link
            to="/user/viewreviews"
            className="flex flex-col items-center text-gray-800 hover:text-blue-500"
          >
            <FaStar size={40} className="text-yellow-500" />
            <p className="mt-2 text-sm">Reviews</p>
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/user/chat"
            className="flex flex-col items-center text-gray-800 hover:text-blue-500"
          >
            <FaComments size={40} className="text-blue-500" />
            <p className="mt-2 text-sm">Chat</p>
          </Link>
        </div>
        <div className="text-center">
          <Link
            to="/user/reservations"
            className="flex flex-col items-center text-gray-800 hover:text-blue-500"
          >
            <FaBook size={40} className="text-green-500" />
            <p className="mt-2 text-sm">Reservations</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GuestDashboard;
