import React from 'react';

// Sample reviews data with profile images
const sampleReviews = [
  {
    id: 1,
    reviewerName: "Alice",
    rating: 4,
    comment: "Great host! The place was clean and well-organized.",
    avatar: "https://i.pravatar.cc/50?img=1" // Sample profile image URL
  },
  {
    id: 2,
    reviewerName: "Bob",
    rating: 5,
    comment: "Excellent stay! Highly recommend this host.",
    avatar: "https://i.pravatar.cc/50?img=2" // Sample profile image URL
  },
  {
    id: 3,
    reviewerName: "Alice",
    rating: 3,
    comment: "Good, but there were a few issues with the amenities.",
    avatar: "https://i.pravatar.cc/50?img=1" // Sample profile image URL
  }
];

const Reviews = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-blue-200">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center"> Reviews</h3>
      {sampleReviews.length === 0 ? (
        <p className="text-center text-gray-600">No reviews available</p>
      ) : (
        <ul className="space-y-4">
          {sampleReviews.map((review) => (
            <li key={review.id} className="flex items-start p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-200">
              {/* Profile Image */}
              <img
                src={review.avatar}
                alt={review.reviewerName}
                className="w-14 h-14 rounded-full mr-4 border border-blue-300"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-blue-700">{review.reviewerName}</span>
                  <span className="text-yellow-500 text-lg">
                    {"★".repeat(review.rating)}{" "}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;
