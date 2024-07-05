import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    noOfGuests: 1,
  });

  const [reservationData, setReservationData] = useState({
    propertyId: "",
    totalPrice: 0,
    property: {},
    checkInDate: "",
    checkOutDate: "",
    noOfGuests: 1,
  });

  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reservation/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserReservations(response.data);
        console.log("Fetched reservations:", response.data); // Logging the response data
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reservations:", error);
        toast.error("Error fetching reservations.");
        setLoading(false);
      }
    };

    if (token) {
      fetchReservations();
    }
  }, [token]); // Fetch reservations whenever token changes

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (reservationData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reservation/add`,
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Reservation successful!");
        navigate("/user/reservations"); // Redirect to reservations page or any other page
      }
    } catch (error) {
      console.log("Error making reservation:", error);
      toast.error("Failed to make reservation.");
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        formData,
        reservationData,
        handleChange,
        handleSubmit,
        userReservations,
        loading,
      }}
    >
      {children}
      <ToastContainer />
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
