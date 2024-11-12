import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";
import { FaStar } from "react-icons/fa";

const GuestReviews = () => {
  const { token } = useAuth();
  const [guestReviews, setGuestReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/userreviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGuestReviews(data);
      } catch (error) {
        console.error("Error fetching guest reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserReviews();
    }
  }, [token]);

  const renderStars = (rating) => {
    const maxRating = 5; // Assuming the rating scale is out of 5
    return Array.from({ length: maxRating }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <FaStar />
      </span>
    ));
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      {/* Title Section */}
      <div className="flex mb-6 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h2 className="flex items-center text-3xl font-bold text-gray-800">
          <FaStar className="mr-4 text-yellow-400" />
          My Reviews
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guestReviews.map(({ _id, property, rating, comment, createdAt }) => (
          <div
            key={_id}
            className="bg-white border rounded-lg shadow-lg p-6 flex flex-col"
          >
            <div className="flex items-start mb-4">
              <img
                src={defaultProfileImg}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
              />
              <div>
                <p className="text-gray-900 font-semibold text-lg">
                  You reviewed{" "}
                  <span className="font-bold">{property.title}</span> on{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </p>
                <div className="flex mt-1">{renderStars(rating)}</div>
              </div>
            </div>
            {property.images && property.images[0] && (
              <div className="relative mb-4">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${
                    property.images[0].url
                  }`}
                  alt={property.title}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150"; // Placeholder image if the image fails to load
                  }}
                />
              </div>
            )}
            <p className="text-gray-700 mb-4 ml-[100px]">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestReviews;
