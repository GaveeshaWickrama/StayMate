import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

function NoReviews() {
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 items-center">No Reviews Found</p>
    </div>
  );
}

function Reviews() {
  const { currentUser, loading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [sortOptions, setSortOptions] = useState({
    date: "none", // Default: No sorting
    rating: "none", // Default: No sorting
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/reviews/${currentUser.id}`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews", err);
        setError("Failed to load reviews");
      }
    };

    if (currentUser?.id) {
      fetchReviews();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complaintData = await Promise.all(
          reviews.map(async (review) => {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${review.complaintID}`
            );
            return response.data;
          })
        );
        setComplaints(complaintData);
      } catch (err) {
        console.error("Error fetching complaint data", err);
      }
    };

    if (reviews.length > 0) {
      fetchComplaints();
    }
  }, [reviews]);

  // Sort Reviews Based on Dropdown Selection
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOptions.date !== "none") {
      return sortOptions.date === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOptions.rating !== "none") {
      return sortOptions.rating === "asc" ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0; // No sorting applied
  });

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (sortedReviews.length === 0) {
    return <NoReviews />;
  }

  return (
    <div className="p-6">
      {/* Sort Dropdown Menus */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* Sort by Date Dropdown */}
          <div className="relative">
            <label className="mr-2 text-gray-700 font-medium">Sort by Date:</label>
            <select
              className="border rounded px-4 py-2"
              value={sortOptions.date}
              onChange={(e) =>
                setSortOptions((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            >
              <option value="none">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {/* Sort by Rating Dropdown */}
          <div className="relative">
            <label className="mr-2 text-gray-700 font-medium">Sort by Rating:</label>
            <select
              className="border rounded px-4 py-2"
              value={sortOptions.rating}
              onChange={(e) =>
                setSortOptions((prev) => ({
                  ...prev,
                  rating: e.target.value,
                }))
              }
            >
              <option value="none">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReviews.map((review) => {
          const matchingComplaint = complaints.find(
            (complaint) => complaint._id === review.complaintID
          );
          return (
            <div key={review._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Reviewer Profile"
                  className="w-12 h-12 rounded-full border border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {matchingComplaint?.reservationId?.property?.host_id?.firstName || "N/A"}{" "}
                    {matchingComplaint?.reservationId?.property?.host_id?.lastName || "N/A"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Reviewed on:{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs py-1">{matchingComplaint?.title}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 text-lg">★★★★☆</span>
                <span className="ml-2 text-gray-600 text-sm">
                  ({review.rating}/5)
                </span>
              </div>
              <p className="text-gray-700 text-sm">{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
