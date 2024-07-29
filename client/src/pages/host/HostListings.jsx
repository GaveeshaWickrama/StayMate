import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHome, FaCalendarAlt, FaInfoCircle, FaEyeSlash, FaPlus } from "react-icons/fa";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-center p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 rounded-full p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-blue-500 text-lg font-bold mb-2">Success!</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Okay
        </button>
      </div>
    </div>
  );
};





function ListingCard({ property, handleHide }) {
  return (
    <Link to={`/host/property-details/${property._id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-transparent transform transition-transform duration-300 hover:scale-105 relative card-hover-border">
        <div className="flex w-full">
          <img
            src={`${import.meta.env.VITE_API_URL}/${property.images[0]?.url}`}
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
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <p className="text-gray-700">
                  Added on: {new Date(property.created_at).toLocaleDateString()}
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
              onClick={(e) => {
                e.preventDefault();
                handleHide(property._id);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center justify-center space-x-1 w-full mb-2"
            >
              <FaEyeSlash /> <span>Hide</span>
            </button>
            <div
              className={`px-2 py-1 rounded-full text-white text-center text-sm ${
                property.verification_state === "verified" ? "bg-green-300" : "bg-orange-300"
              }`}
            >
              {property.verification_state === "verified" ? "Verified" : "Pending"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NoListings() {
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 mb-10">
        You don't have any listings yet.
      </p>
      <Link
        to="/host/add-property"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2"
      >
        <FaPlus />
        <span>Add a New Listing</span>
      </Link>
    </div>
  );
}

function HostListings() {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/properties/host-properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();

    if (location.state?.fromAddProperty) {
      setPopupMessage("Property added successfully!");
      // Reset location state to prevent multiple popups
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 0);
    }
  }, [token, location.state, navigate]);

  const handleHide = (propertyId) => {
    // TODO: Implement hide property functionality
    console.log("Hide property:", propertyId);
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  return (
    <div className="container mx-auto p-10">
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">
        Your Listings
      </h1>
      {properties.length === 0 ? (
        <NoListings />
      ) : (
        <div className="flex flex-col gap-8">
          {properties.map((property) => (
            <ListingCard
              key={property._id}
              property={property}
              handleHide={handleHide}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HostListings;
