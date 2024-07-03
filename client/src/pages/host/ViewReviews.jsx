import React from "react";
import img1 from "../../assets/img1.jpeg";

const reviews = [
  {
    id: 1,
    reviewer: "John Doe",
    rating: 4,
    comment: "Great experience, very comfortable!",
    date: "2023-06-15"
  },
  {
    id: 2,
    reviewer: "Jane Smith",
    rating: 5,
    comment: "Absolutely loved it, will come again!",
    date: "2023-07-01"
  },
  // Add more reviews as needed
];

const ViewReviews = () => {
  return (
    <div className="flex justify-center p-10 mt-[100px] bg-gray-100 min-h-screen">
      <div className="flex flex-col max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full p-6 bg-blue-500 text-white">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            Property Reviews
          </h1>
        </div>
        <div className="w-full p-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
            >
              <div className="flex items-center mb-2">
                <img
                  src={img1}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {review.reviewer}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {review.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="text-gray-800">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
