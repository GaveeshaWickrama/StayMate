import React from "react";
import { useReservation } from "../../context/ReservationContext";
import { useNavigate } from "react-router-dom";

const ReservationForm = ({ propertyId, pricePerNight, property }) => {
  const { formData, handleChange } = useReservation();
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    if (!formData.checkInDate || !formData.checkOutDate) {
      return 0;
    }

    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );

    const totalPrice = pricePerNight * nights * formData.noOfGuests;
    return totalPrice;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    const reservationData = {
      propertyId,
      totalPrice,
      property,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      noOfGuests: formData.noOfGuests,
    };
    navigate("/user/tripdetails", { state: reservationData });
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-2xl font-bold mb-4">
        {pricePerNight} <span className="text-sm font-normal">per night</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="checkInDate" className="block text-gray-700">
            Check-In
          </label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label htmlFor="checkOutDate" className="block text-gray-700">
            Check-Out
          </label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="noOfGuests" className="block text-gray-700">
          Guests
        </label>
        <select
          id="noOfGuests"
          name="noOfGuests"
          value={formData.noOfGuests}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} guest{i > 0 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
      >
        Reserve
      </button>
    </form>
  );
};

export default ReservationForm;
