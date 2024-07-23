import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreContext = createContext(); // Renaming ReservationContext to StoreContext

export const StoreProvider = ({ children }) => {
  // Renaming ReservationProvider to StoreProvider
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
        //toast.error("Error fetching reservations.");
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

  const fetchPropertyById = async (propertyId) => {
    // Mock fetch function, replace with actual API call
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Return the property data from the API response
    } catch (error) {
      console.log("Error fetching property details:", error);
      toast.error("Failed to fetch property details.");
      return null; // Return null or handle the error as appropriate
    }
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
        navigate("/user/reservations");
      }
    } catch (error) {
      console.log("Error making reservation:", error);
      toast.error("Failed to make reservation.");
    }
  };

  const addReview = async (reviewData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/add`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Review added successfully!");
        navigate("/user/viewreviews");
      }
    } catch (error) {
      console.log("Error adding review:", error);
      toast.error("Failed to add review.");
    }
  };

  return (
    <StoreContext.Provider
      value={{
        formData,
        reservationData,
        handleChange,
        handleSubmit,
        userReservations,
        loading,
        addReview,
        fetchPropertyById,
      }}
    >
      {children}
      <ToastContainer />
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext); // Renaming useReservation to useStore
