// src/pages/PaymentSuccess.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaCcStripe } from "react-icons/fa"; // Stripe icon

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleViewReservations = () => {
    navigate("/user/reservations");
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col items-center mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-4xl font-extrabold text-black-600 text-center">
          Payment Successful
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Your payment was successful. You can now view your reservations.
        </p>
        <button
          onClick={handleViewReservations}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-4"
        >
          View Reservations
        </button>
      </div>

      {/* Powered by Stripe Section */}
      <div className="flex items-center justify-center mt-6 text-gray-700">
        <span className="mr-2">Powered by</span>
        <FaCcStripe className="text-blue-500 text-3xl" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
