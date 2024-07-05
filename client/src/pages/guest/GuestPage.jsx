import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa";
import ReservationForm from "./ReservationForm";
import { useAuth } from "../../context/auth";

function ListingCard({ property, handleBook }) {
  const imageUrl = `${import.meta.env.VITE_API_URL}/${property.images[0]?.url}`;

  const pricePerNight =
    property.sections.length > 0 ? property.sections[0].price_per_night : 0;

  console.log("Image URL:", imageUrl);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border">
      <div className="flex w-full">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-1/3 h-48 object-cover"
        />

        <div className="flex flex-col justify-between pl-6 w-2/3 overflow-hidden">
          <div>
            <h2 className="text-2xl font-semibold text-black-500 mb-2 pt-3">
              {property.title}
            </h2>
            <div className="flex items-center mb-2">
              <FaInfoCircle className="text-blue-500 mr-2" />
              <p className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
                {property.description}
              </p>
            </div>

            <div className="flex items-center mb-2">
              <FaHome className="text-blue-500 mr-2" />
              <p className="text-gray-700">{property.type}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              <p className="text-gray-600">
                {property.location.address}, {property.location.city},{" "}
                {property.location.district}, {property.location.province},{" "}
                {property.location.zipcode}
              </p>
            </div>
          </div>
        </div>

        <div
          className="ml-8 mt-9 mb-8"
          style={{ borderLeft: "2px dashed blue" }}
        ></div>

        <div className="flex flex-col bg-grey-400 justify-around p-4 m-2 rounded-lg">
          <button
            onClick={() => handleBook(property, pricePerNight)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center space-x-1 mb-0 w-full"
          >
            <span>Check Availability</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GuestPage() {
  const [properties, setProperties] = useState([]);
  const [bookingProperty, setBookingProperty] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/properties`
        );
        setProperties(response.data);
        console.log("Properties data:", response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleBook = (property, pricePerNight) => {
    // Receive pricePerNight here
    setBookingProperty(property);
    setPricePerNight(pricePerNight); // Set pricePerNight state
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Available Listings
      </h1>
      {properties.length === 0 ? (
        <p className="text-center text-lg text-gray-700">
          No properties available.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {properties.map((property) => (
            <ListingCard
              key={property._id}
              property={property}
              handleBook={handleBook}
            />
          ))}
        </div>
      )}
      {bookingProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Book Property</h2>
            <ReservationForm
              property={bookingProperty}
              propertyId={bookingProperty._id}
              pricePerNight={pricePerNight}
            />
            <button
              onClick={() => setBookingProperty(null)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestPage;
