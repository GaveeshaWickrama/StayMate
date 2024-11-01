import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaLock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
} from "react-icons/fa";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const TripDetails = () => {
  const { state } = useLocation();
  const { fetchPropertyById, updateUserReservations } = useStore();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.propertyId && !state.property) {
      fetchPropertyById(state.propertyId).then((data) => {
        setProperty(data);
      });
    } else {
      setProperty(state.property || null);
    }
  }, [state, fetchPropertyById]);

  if (!state) {
    return (
      <div className="container mx-auto p-10">
        No trip details available. Please go back and select a trip.
      </div>
    );
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

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again later.");
      return;
    }

    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      toast.error("Failed to create payment method.");
      setLoading(false);
      return;
    }

    const reservationData = {
      sectionId,
      propertyId,
      checkInDate,
      checkOutDate,
      noOfGuests,
      totalPrice,
      property,
      paymentMethodId: paymentMethod.id,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reservation/add`,
        {
          ...reservationData,
          returnUrl: "http://localhost:5173/user/reserve/payment_success",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Reservation successful!");

        const updatedResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservation/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        updateUserReservations(updatedResponse.data);
        navigate("/user/reserve/payment_success");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      toast.error("Failed to make reservation.");
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto p-10">
      <div className="flex flex-col items-center mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="text-4xl font-extrabold text-black-600 text-center">
          Confirm Your Trip
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-600" />
            Payment Details
          </h2>

          <form onSubmit={handleConfirmBooking} className="space-y-6">
            <div className="border border-gray-300 p-4 rounded-lg">
              <label className="block text-gray-700 font-medium mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Cardholder Name"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-4">
              <div className="border border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  Card Number
                </label>
                <CardNumberElement className="border border-gray-300 p-3 rounded-lg w-full" />
              </div>
              <div className="border border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  Expiry Date
                </label>
                <CardExpiryElement className="border border-gray-300 p-3 rounded-lg w-full" />
              </div>
            </div>

            <div className="border border-gray-300 p-4 rounded-lg mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                CVC
              </label>
              <CardCvcElement className="border border-gray-300 p-3 rounded-lg w-full" />
            </div>

            <button
              type="submit"
              className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>

          {/* SSL Encryption Icon */}
          <div className="flex items-center justify-center mt-4">
            <FaLock className="text-green-600 text-lg mr-2" />
            <span className="text-gray-700 text-sm">SSL Encrypted</span>
          </div>

          {/* Payment Card Icons */}
          <div className="flex items-center justify-center mt-4 space-x-4">
            <FaCcVisa className="text-4xl text-blue-600" />
            <FaCcMastercard className="text-4xl text-red-600" />
            <FaCcAmex className="text-4xl text-blue-800" />
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Trip Details</h2>

          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="border-b border-gray-300 mb-4">
                <p className="text-gray-700 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  <strong>Trip Dates:</strong>
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  {checkInDate}
                </p>
                <p className="text-gray-700 mb-2 flex items-center">
                  {checkOutDate}
                </p>
              </div>
              <p className="text-gray-700 mb-2 flex items-center">
                <FaUsers className="mr-2" />
                <strong>Guests:</strong> {noOfGuests}
              </p>
              <h2 className="text-2xl font-bold mt-6">Total Price</h2>
              <p className="text-gray-700 text-3xl font-bold">
                {formatPrice(totalPrice)}
              </p>
            </div>
            <div className="flex-shrink-0">
              {property && property.images && property.images.length > 0 ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${
                    property.images[0]?.url
                  }`}
                  alt="Property"
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripDetailsWrapper = () => (
  <Elements stripe={stripePromise}>
    <TripDetails />
  </Elements>
);

export default TripDetailsWrapper;
