import React from "react";
import img1 from "../../assets/img1.jpeg";

const ReviewAdd = () => {
  return (
    <div className="flex justify-center p-6 mt-[100px]">
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
          <form className="flex flex-col">
            <textarea
              className="w-full h-36 p-4 border border-gray-300 rounded-lg mb-2"
              placeholder="Describe your experience"
            />
            <p className="text-xs text-gray-500 mb-4">
              * Your review will be public on your guest profile
            </p>
            <div>
              <h2 className="text-lg mb-2">Overall Rating</h2>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-3xl cursor-pointer text-gray-400"
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewAdd;
