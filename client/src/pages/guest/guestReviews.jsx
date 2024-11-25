import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";
import { FaStar } from "react-icons/fa";

const GuestReviews = () => {
  const { token } = useAuth();
  const [guestReviews, setGuestReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starFilter, setStarFilter] = useState("all");

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
        setFilteredReviews(data); // Set the initial state to all reviews
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

  useEffect(() => {
    // Handle filtering reviews
    if (starFilter === "all") {
      setFilteredReviews(guestReviews); // Show all reviews if "all" is selected
    } else {
      const filtered = guestReviews.filter(
        (review) => review.rating === Number(starFilter)
      );
      setFilteredReviews(filtered); // Filter reviews based on selected star rating
    }
  }, [starFilter, guestReviews]);

  const renderStars = (rating) => {
    const maxRating = 5;
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

  const handleFilterChange = (e) => {
    setStarFilter(e.target.value);
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

      {/* Filter Section */}
      <div className="mb-6 flex justify-end">
        <select
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300 ease-in-out"
          onChange={handleFilterChange}
          value={starFilter}
        >
          <option
            value="all"
            className="bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            All Ratings
          </option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option
              key={star}
              value={star}
              className="bg-white text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              {star} Star{star > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map(
          ({ _id, property, rating, comment, createdAt }) => (
            <div
              key={_id}
              className="bg-white border rounded-lg shadow-lg p-6 flex flex-col transition-transform transform hover:scale-105"
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
          )
        )}
      </div>
    </div>
  );
};

export default GuestReviews;
