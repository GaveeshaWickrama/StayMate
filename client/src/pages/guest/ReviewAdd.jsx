import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import img1 from "../../assets/img1.jpeg";
import { MdEventAvailable } from "react-icons/md";

const ReviewAdd = () => {
  const { addReview } = useStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [errors, setErrors] = useState({});

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("reservationId");
    setReservationId(id);
  }, [location]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (rating === 0) {
      newErrors.rating = "Please provide a rating.";
    }
    if (!comment.trim()) {
      newErrors.comment = "Please enter a comment.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const reviewData = {
      reservationId,
      rating,
      comment,
    };
    console.log("Submitting review", reviewData);
    await addReview(reviewData);
  };

  return (
    <div className="container mx-auto p-4 mt-1 ml-4">
      {/* Title Section */}
      <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <MdEventAvailable className="mr-4" />
          Add a Review
        </h1>
      </div>
      <div className="flex justify-center p-10 mt-[10px]">
        <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg">
          <div className="w-1/3">
            <img
              src={img1}
              alt="Grand Suite in Las Vegas"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-2/3 p-6">
            <h1 className="text-2xl font-semibold mb-4">
              Describe your experience
            </h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <textarea
                className="w-full h-40 p-6 border border-gray-300 rounded-lg mb-2"
                placeholder="Describe your experience"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {errors.comment && (
                <p className="text-red-500 text-sm">{errors.comment}</p>
              )}
              <p className="text-xs text-gray-500 mb-4">
                * Your review will be public on your guest profile
              </p>
              <div>
                <h2 className="text-lg mb-2">Overall Rating</h2>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-3xl cursor-pointer ${
                        rating >= star ? "text-yellow-500" : "text-gray-400"
                      }`}
                      onClick={() => handleRating(star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </div>
              <div className="flex justify-end">
                <span className="font-semibold cursor-pointer mr-4">
                  Go Back
                </span>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAdd;
