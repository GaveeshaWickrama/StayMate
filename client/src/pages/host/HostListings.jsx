import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaHome,
  FaCalendarAlt,
  FaInfoCircle,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

function ListingCard({ property, handleEdit, handleDelete }) {
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
              onClick={() => handleEdit(property._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center space-x-1 mb-0 w-full"
            >
              {" "}
              <FaEdit /> <span>Edit</span>{" "}
            </button>
            <button
              onClick={() => handleDelete(property._id)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center justify-center space-x-1 w-full"
            >
              {" "}
              <FaTrash /> <span>Delete</span>{" "}
            </button>
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
  }, [token]);

  const handleEdit = (propertyId) => {
    //TODO:
    console.log("Edit property:", propertyId);
  };

  const handleDelete = (propertyId) => {
    //TODO:
    console.log("Delete property:", propertyId);
  };

  return (
    <div className="container mx-auto p-10">
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
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HostListings;