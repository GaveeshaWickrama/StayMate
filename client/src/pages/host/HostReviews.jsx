// import React from 'react';

// // Sample reviews data with profile images
// const sampleReviews = [
//   {
//     id: 1,
//     reviewerName: "Alice",
//     rating: 4,
//     comment: "Great host! The place was clean and well-organized.",
//     avatar: "https://i.pravatar.cc/50?img=1" // Sample profile image URL
//   },
//   {
//     id: 2,
//     reviewerName: "Bob",
//     rating: 5,
//     comment: "Excellent stay! Highly recommend this host.",
//     avatar: "https://i.pravatar.cc/50?img=2" // Sample profile image URL
//   },
//   {
//     id: 3,
//     reviewerName: "Alice",
//     rating: 3,
//     comment: "Good, but there were a few issues with the amenities.",
//     avatar: "https://i.pravatar.cc/50?img=1" // Sample profile image URL
//   }
// ];

// const Reviews = () => {
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg border border-blue-200">
//       <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center"> Reviews</h3>
//       {sampleReviews.length === 0 ? (
//         <p className="text-center text-gray-600">No reviews available</p>
//       ) : (
//         <ul className="space-y-4">
//           {sampleReviews.map((review) => (
//             <li key={review.id} className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
//               {/* Profile Image */}
//               <img
//                 src={review.avatar}
//                 alt={review.reviewerName}
//                 className="w-14 h-14 rounded-full mr-4 border border-blue-300"
//               />
//               <div className="flex-1">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-lg font-semibold text-blue-700">{review.reviewerName}</span>
//                   <span className="text-yellow-500 text-lg">
//                     {"★".repeat(review.rating)}{" "}
//                     {"☆".repeat(5 - review.rating)}
//                   </span>
//                 </div>
//                 <p className="text-gray-700 text-sm">{review.comment}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Reviews;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";

const ViewReviews = () => {
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
        // Handle error as per your application's requirements
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

  return (
    <div className="flex mt-8 ml-32">
      <h2 className="text-3xl font-bold mb-4 ml-[200px]">Reviews</h2>
      <ul className="ml-2 mt-[100px]">
        {hostReviews.map((review) => (
          <li
            key={review._id}
            className="flex items-start border-b border-gray-200 py-4"
          >
            <img
              src={defaultProfileImg}
              alt="Profile"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h3 className="text-gray-900 font-semibold">
                  {review.user.email}
                </h3>
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        index < review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
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
              <p className="text-gray-600">{review.property.title}</p>
              {/* Add more review details as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewReviews;
