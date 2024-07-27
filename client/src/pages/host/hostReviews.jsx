import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";

const HostReviews = () => {
  const { token } = useAuth();
  const [hostReviews, setHostReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  // Function to extract name from email
  const extractNameFromEmail = (email) => {
    const atIndex = email.indexOf("@");
    return email.substring(0, atIndex);
  };

  return (
    <div className="container mx-auto py-8 ml-[200px]">
      <h2 className="text-3xl font-bold mb-4">Reviews</h2>
      <ul>
        {hostReviews.map((review) => (
          <li
            key={review._id}
            className="flex items-start border-b border-gray-200 py-4 mt-[100px]"
          >
            <img
              src={defaultProfileImg}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {/* Display name from email */}
                <h3 className="text-gray-900 font-semibold">
                  {extractNameFromEmail(review.user.email)}
                </h3>
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-2xl ${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ⭐️
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-gray-600">{review.property.title}</p>
              <div className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostReviews;
