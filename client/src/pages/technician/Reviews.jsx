import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import axios from "axios";
import { useParams } from "react-router-dom";

function NoReviews() {
  return (
    <div className="text-center mt-20">
      <p className="text-lg text-gray-700 items-center">no Reviews found</p>
      {/* <Link to="/host/add-technician" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center space-x-2">
        
        
      </Link> */}
    </div>
  );
}

function Reviews() {
  // const { id } = useParams();  //technician id
  const { currentUser, setCurrentUser, loading, setLoading } = useAuth();

  const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [complaints, setComplaints] = useState([]);

  if (loading) {
    return <div>Loading application...</div>;
  }

  console.log("structure of the current user id", currentUser);
  // console.log("this is the params ",id);
  console.log(
    "this is the current user id received by reviews frontend",
    currentUser.id
  );

  console.log(
    `${import.meta.env.VITE_API_URL}/technicians/reviews/${currentUser.id}`
  );

  useEffect(() => {
    const fetchReviews = async () => {
      // if (!currentUser) return;
      console.log("enters here");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/technicians/reviews/${
            currentUser.id
          }`
        );
        console.log("doesnt enter here");
        console.log("Response from backend:", response.data); // Log the actual data

        setReviews(response.data);
        // setLoading(false);
        console.log(reviews);
      } catch (err) {
        console.error("error fetching reviews", err);
        setError("failed to load reviews");
        setLoading(false);
      }
    };

    if (currentUser.id) {
      fetchReviews();
    }
  }, []);

  console.log("reviews", reviews);
  console.log(
    "these are the complaint ids gotten from reviews",
    reviews.map((review) =>  `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${
      review.complaintID
    }`)
  );

  

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complaints = await Promise.all(
          reviews.map(async (review) => {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/complaints/complaint-details/${
                review.complaintID
              }`
            );
            console.log("this is the response",response.data);
            return response.data;
          })
        );
        
        setComplaints(complaints);
       
      } catch (err) {
        console.error("error fetching complaint data", err);
      }
    };
    if (reviews.length > 0) { // Only fetch complaints if reviews exist
      fetchComplaints();
    } 
  },[reviews]);

  console.log("these are the complaints",complaints);

  if (loading) {
    return <div>Loading reviews</div>; //show loading text while data is being fetched
  }

  // Handle case where `currentUser` is still null
  if (!currentUser) {
    return <div>No user found.</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (reviews.length === 0) {
    return <NoReviews />;
  }

  console.log("list of complaint details objects".complaints);
  console.log("this is after the data is retrieved");
  console.log(
    "this is the reviews received as the reviews for the technician id",
    reviews
  );
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* <!-- Review Card --> */}
      {reviews.map((review) => {
         const matchingComplaint = complaints.find(
          (complaint) => complaint._id === review.complaintID
        );
          {console.log("this is the matching complaint",matchingComplaint)}
        return(
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
          <div class="flex items-center space-x-4">
            {/* <!-- Profile Picture --> */}
            <img
              src="https://via.placeholder.com/50"
              alt="Reviewer Profile"
              class="w-12 h-12 rounded-full border border-gray-200"
            />
            {/* <!-- Reviewer Details --> */}
            <div>
              <h3 class="text-lg font-semibold text-gray-800">
              {matchingComplaint?.reservationId?.property?.host_id?.firstName ||
                "N/A"} {" "}  {matchingComplaint?.reservationId?.property?.host_id?.lastName ||
                  "N/A"}
              </h3>
              <p class="text-sm text-gray-500">  Reviewed on: {new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}</p>
              
              <p className="text-xs py-1"> {matchingComplaint?.title}</p>
            </div>
          </div>
          {/* <!-- Rating --> */}
          <div class="flex items-center">
            <span class="text-yellow-500 text-lg">★★★★☆</span>
            <span class="ml-2 text-gray-600 text-sm">({review.rating}/5)</span>
          </div>
          {/* <!-- Review Text --> */}
          <p class="text-gray-700 text-sm">{review.review}</p>
        </div>
        )
})}
    </div>
  );
}

export default Reviews;
