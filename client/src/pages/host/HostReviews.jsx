import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultProfileImg from "../../assets/profile.jpg";

const HostReviews = () => {
  const [hostReviews, setHostReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from the backend
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/host-reviews");
        setHostReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching host reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6">Host Reviews</h2>
      <ul className="space-y-6">
        {hostReviews.map((review) => (
          <li key={review._id} className="flex items-start border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <img
              src={defaultProfileImg}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h3 className="text-gray-800 font-semibold">{review.user.email}</h3>
                <div className="ml-3 flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a.75.75 0 0 1 .67.41l1.85 3.78 4.15.6a.75.75 0 0 1 .42 1.28l-3 2.93.71 4.13a.75.75 0 0 1-1.09.79L10 14.24l-3.72 1.96a.75.75 0 0 1-1.09-.79l.71-4.13-3-2.93a.75.75 0 0 1 .42-1.28l4.15-.6L9.33 1.41A.75.75 0 0 1 10 1zm0 2.27L8.33 6.05a.75.75 0 0 1-.22.41l-3 2.93a.75.75 0 0 1 .42 1.28l2.17 2.12-.51 2.98a.75.75 0 0 1-1.09.79L10 14.24l-2.67 1.41a.75.75 0 0 1-1.09-.79l-.51-2.98L2.47 9.67a.75.75 0 0 1 .42-1.28l3-2.93a.75.75 0 0 1-.22-.41L5 3.27 3.34 1.86a.75.75 0 0 1 1.09-.79l2.17 2.12L9.32 1.7a.75.75 0 0 1 .66 0l2.17 2.12 2.17-2.12a.75.75 0 0 1 1.09.79L14 3.27l-1.66 1.41a.75.75 0 0 1-.22.41L10 5.27V3.27z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-600 italic">{review.property.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HostReviews;
