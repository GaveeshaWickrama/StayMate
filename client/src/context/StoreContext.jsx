import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
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
        setLoading(false);
      } catch (error) {
        console.log("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchReservations();
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPropertyById = async (propertyId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching property details:", error);
      toast.error("Failed to fetch property details.");
      return null;
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

  // Function to update user reservations
  const updateUserReservations = (reservations) => {
    setUserReservations(reservations);
  };

  return (
    <StoreContext.Provider
      value={{
        formData,
        reservationData,
        handleChange,
        userReservations,
        loading,
        addReview,
        fetchPropertyById,
        updateUserReservations, // Expose the update function
      }}
    >
      {children}
      <ToastContainer />
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
