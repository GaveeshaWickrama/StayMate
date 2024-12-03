import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";

// StarRating component to display the star ratings visually
const StarRating = ({ rating }) => {
  const fullStars = Array(rating).fill("★");
  const emptyStars = Array(5 - rating).fill("☆");

  return (
    <span className="text-yellow-400">
      {fullStars.map((star, index) => (
        <span key={`full-${index}`} className="text-xl">
          {star}
        </span>
      ))}
      {emptyStars.map((star, index) => (
        <span key={`empty-${index}`} className="text-xl">
          {star}
        </span>
      ))}
    </span>
  );
};

const HostReviews = () => {
  const { token } = useAuth();
  const [hostReviews, setHostReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [starFilter, setStarFilter] = useState(""); // Filter based on stars

  useEffect(() => {
    const fetchHostReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reviews/hostreviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHostReviews(response.data);
        console.log("Response data:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching host reviews:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchHostReviews();
    }
  }, [token]);

  // Filter reviews based on star rating
  const filteredReviews = hostReviews.filter((review) =>
    starFilter ? review.rating === parseInt(starFilter) : true
  );

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Reviews</h2>

      {/* Star rating filter dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={starFilter}
          onChange={(e) => setStarFilter(e.target.value)}
          className="p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
        >
          <option value="">Filter by stars</option>
          {[1, 2, 3, 4, 5].map((stars) => (
            <option key={stars} value={stars}>
              {stars} {stars === 1 ? "Star" : "Stars"}
            </option>
          ))}
        </select>
      </div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col bg-white border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
          >
            {/* Profile Image */}
            <img
              src={defaultProfileImg}
              alt="Profile"
              className="w-16 h-16 rounded-full mb-4 mx-auto"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold text-lg text-center">
                  {review.user.firstName} {review.user.lastName}
                </h3>
                <div className="flex items-center space-x-1">
                  <StarRating rating={review.rating} />
                </div>
              </div>

              {/* Property Image */}
              {review.property.images && review.property.images[0] && (
                <div className="relative mb-4">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${
                      review.property.images[0].url
                    }`}
                    alt={review.property.title}
                    className="w-full h-32 object-cover rounded-lg shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150"; // Placeholder image if the image fails to load
                    }}
                  />
                </div>
              )}

              <p className="text-gray-700 mb-4">{review.comment}</p>
              <p className="text-gray-600 text-center">
                {review.property.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostReviews;
export default HostReviews;
