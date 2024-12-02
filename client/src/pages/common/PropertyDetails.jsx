import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "../../components/Carousel";
import PropertyAmenitiesDisplay from "../host/components/PropertyAmenitiesDisplay";
import ReservationSection from "../../components/ReservationSection";
import PropertyHost from "../../components/PropertyHost";
import {
  FaCouch,
  FaHome,
  FaClock,
  FaMapMarkerAlt,
  FaShower,
  FaBed,
  FaUserFriends,
  FaDoorClosed,
  FaBath,
  FaImages,
} from "react-icons/fa";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const PropertyHeader = ({ title, createdAt }) => {
  return (
    <div className="flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white">
      <h1 className="flex items-center text-4xl font-extrabold text-black-600">
        <FaHome className="mr-4" /> {title}
      </h1>
      <div className="flex items-center text-gray-600 ml-6 mt-3">
        <FaClock className="mr-2" />{" "}
        <span>Added on: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const PropertyImages = ({ images }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-4">
      <Carousel
        images={images.map((img) => ({
          url: `${import.meta.env.VITE_API_URL}/${img.url.replace(/\\/g, "/")}`,
        }))}
      />
    </div>
  );
};


const PropertyInfo = ({ location, section, propertyId }) => {
  return (
    <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
      {/* Property Location */}
      <div className="bg-white p-6 px-8 flex items-center border-b">
        <FaMapMarkerAlt className="mr-4 text-2xl text-blue-500" />
        <p className="font-semibold text-xl">
          {location.address} {location.province}
        </p>
      </div>

      {/* Property Plan Details */}
      <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
        <MdOutlineMeetingRoom className="text-blue-500" />
        <p>Bedrooms: {section.plan.bedrooms}</p>
        <IoBedSharp className="ml-3 text-blue-500" />
        <p>Beds: {section.plan.beds}</p>
        <FaShower className="ml-3 text-blue-500" />
        <p>Bathrooms: {section.plan.bathrooms}</p>
        <GoPersonFill className="ml-3 text-blue-500" />
        <p>Guests: {section.plan.guests}</p>
      </div>

      {/* Review Summary Section */}
      <div className="bg-white py-2">
        <ReviewSummary propertyId={propertyId} />
      </div>
    </div>
  );
};

const ReviewSummary = ({ propertyId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/properties/${propertyId}/reviews`
        );

        const reviews = response.data;
        const total = reviews.length;
        const avg =
          total > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / total
            : 0;

        setAverageRating(avg);
        setTotalReviews(total);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  return (
    <div className="flex items-center px-10 py-4 bg-white">
      {totalReviews > 0 ? (
        <>
          {/* Average Rating */}
          <div className="flex flex-row items-center border-r pr-4 gap-2">
            <span className="text-2xl font-bold text-gray-900">Rating</span>
            <span className="text-2xl font-bold text-gray-900">
              {averageRating.toFixed(2)}
            </span>
            <div className="flex px-6">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${
                    index < Math.round(averageRating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568L24 9.75l-6 5.848L19.336 24 12 20.187 4.664 24 6 15.598 0 9.75l8.332-1.595L12 .587z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Total Reviews */}
          <div className="pl-4 flex flex-row py-2">
            <span className="text-2xl font-bold text-gray-900">
              {totalReviews}
            </span>
            <p className="text-2xl pl-4 text-gray-500 underline">Reviews</p>
          </div>
        </>
      ) : (
        <div className="text-center text-lg text-gray-500 italic">
          No reviews yet.
        </div>
      )}
    </div>
  );
};


const PropertyInfoSections = ({ location, propertyId, sections }) => {
  return (
    <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
      {/* Location Section */}
      <div className="bg-white p-8 flex items-center border-b">
        <FaMapMarkerAlt className="mr-2" />
        <p className="font-semibold text-xl">
          {capitalizeWords(location.address)}{" "}
          {capitalizeWords(location.province)}
        </p>
      </div>

      {/* Review Summary Section */}
      <div className="bg-white px-6 flex items-center border-b">
        <ReviewSummary propertyId={propertyId} />
      </div>

      {/* Sections Summary Section */}
      
      
        <div className="flex flex-wrap gap-4 px-8 py-5">
          <div className="text-xl font-bold pt-2 underline text-gray-500">Accommodations</div>
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm"
            >
              <span className="font-medium text-black">
                {section.section_name}
              </span>
              <span className="font-bold text-black">({section.count})</span>
            </div>
          ))}
      
      </div>
    </div>
  );
};






const PropertyHostInfo = ({ propertyId }) => {
  return (
    <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Hosted By</h2>
      <PropertyHost propertyId={propertyId} />
    </div>
  );
};

const PropertyDescription = ({ description }) => {
  return (
    <div className="w-full rounded-lg p-6 bg-white shadow mt-2">
      <h2 className="text-xl font-bold mb-2">Description</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
};

const SectionDetails = ({ section }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 mt-4 p-4 rounded-lg shadow-inner w-8/12">
      <div className="flex items-center mb-4">
        <FaDoorClosed className="text-2xl text-blue-600 mr-2" />
        <p className="text-lg">
          <strong>Bedrooms:</strong> {section.plan.bedrooms}
        </p>
      </div>
      <div className="flex items-center mb-4">
        <FaBath className="text-2xl text-blue-600 mr-2" />
        <p className="text-lg">
          <strong>Bathrooms:</strong> {section.plan.bathrooms}
        </p>
      </div>
      <div className="flex items-center mb-4">
        <FaUserFriends className="text-2xl text-blue-600 mr-2" />
        <p className="text-lg">
          <strong>Guests:</strong> {section.plan.guests}
        </p>
      </div>
      <div className="flex items-center mb-4">
        <FaBed className="text-2xl text-blue-600 mr-2" />
        <p className="text-lg">
          <strong>Beds:</strong> {section.plan.beds}
        </p>
      </div>
    </div>
  );
};

const PropertySection = ({ section, isExpanded, onExpand, propertyId }) => {
  const imageUrl_0 = `${
    import.meta.env.VITE_API_URL
  }/${section.images[0].url.replace(/\\/g, "/")}`;

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex items-center cursor-pointer" onClick={onExpand}>
        <img
          src={imageUrl_0}
          alt={section.section_name}
          className="w-96 h-40 object-cover rounded-lg mr-10 ml-2"
        />
        <div className="flex flex-col justify-around w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">{section.section_name}</h3>
            <p className="text-lg text-white bg-blue-600 rounded-md p-2">
              <strong>Price Per Night:</strong> Rs {section.price_per_night}
            </p>
          </div>
          <SectionDetails section={section} />
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="flex my-6 bg-gray-100 p-4 border-round font-bold">
            <h1 className="flex items-center text-2xl text-black-600">
              <FaImages className="mr-4" /> More Images
            </h1>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_API_URL}/${img.url.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={`Section image ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
          <PropertyAmenitiesDisplay amenities={section.amenities} />
          <ReservationSection
            sectionId={section.section_id}
            propertyId={propertyId} // Pass the propertyId to ReservationSection
            nightlyRate={section.price_per_night}
            initialCheckInDate="2024-07-11"
            initialCheckOutDate="2024-07-16"
            serviceFeePercentage={10}
          />
        </>
      )}
    </div>
  );
};

const PropertySectionsList = ({ property }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <PropertyHeader title={property.title} createdAt={property.created_at} />
      <PropertyImages images={property.images} />
      <div className="flex flex-col md:flex-row gap-4">
      <PropertyInfoSections
          location={property.location}
          propertyId={property._id}
          sections={property.sections}
        />

        <PropertyHostInfo propertyId={property._id} />
      </div>
      <PropertyDescription description={property.description} />

      <div className="flex mt-6 border-b-4 border-blue-600 p-6  shadow-sm bg-white">
        <h1 className="flex items-center text-3xl font-extrabold text-black-600">
          {" "}
          <FaCouch className="mr-4" /> Accommodation Types{" "}
        </h1>
      </div>

      {property.sections.map((section, index) => (
        <PropertySection
          key={index}
          section={section}
          isExpanded={expandedIndex === index}
          onExpand={() => handleExpand(index)}
          propertyId={property._id}
        />
      ))}
      <PropertyAmenitiesDisplay amenities={property.amenities} />
    </div>
  );
};

const DetailedPropertyView = ({ property, id }) => {
  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <PropertyHeader title={property.title} createdAt={property.created_at} />
      <PropertyImages images={property.images} />
      <div className="flex flex-col md:flex-row gap-4">
        <PropertyInfo
          location={property.location}
          section={property.sections[0]}
          propertyId={property._id}
        />
        <PropertyHostInfo propertyId={property._id} />
      </div>
      <PropertyDescription description={property.description} />
      <ReservationSection
        propertyId={id}
        sectionId={property.sections[0].section_id}
        nightlyRate={property.sections[0].price_per_night}
        initialCheckInDate={new Date().toISOString().split("T")[0]} // Today's date in YYYY-MM-DD format
        initialCheckOutDate={
          new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0]
        } // Today's date + 7 days in YYYY-MM-DD format
        serviceFeePercentage={10}
      />

      <PropertyAmenitiesDisplay amenities={property.amenities} />
      <ReviewsList propertyId={property._id} />
    </div>
  );
};

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/properties/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  if (property.total_unique_sections === -1) {
    return <DetailedPropertyView property={property} id={id} />;
  } else {
    return <PropertySectionsList property={property} />;
  }
}

const ReviewsList = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // Number of reviews to show initially

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/properties/${propertyId}/reviews`
        );

        // Add a full URL to profile pictures if they exist
        const reviewsWithPictures = response.data.map((review) => {
          const pictureUrl = review.user.picture
            ? `${import.meta.env.VITE_API_URL}/${review.user.picture}`
            : `${import.meta.env.VITE_API_URL}/default-profile.jpg`; // Fallback to a default profile picture

          return {
            ...review,
            user: {
              ...review.user,
              picture: pictureUrl,
            },
          };
        });

        setReviews(reviewsWithPictures);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Increase the visible reviews by 4
  };

  if (loading) {
    return (
      <div className="text-center text-lg text-gray-500">Loading reviews...</div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500 my-8 italic">
        
      </div>
    );
  }

  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 bg-gray p-2 ">Reviews</h2>
      <ul className="space-y-4">
        {reviews.slice(0, visibleCount).map((review) => (
          <li
            key={review._id}
            className="px-4 py-2 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center mb-2">
              <img
                src={review.user.picture}
                alt={`${review.user.firstName} ${review.user.lastName}`}
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">
                    {review.user.firstName} {review.user.lastName}
                  </p>
                  <div className="flex items-center">
                    {/* Star Rating */}
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.848L19.336 24 12 20.187 4.664 24 6 15.598 0 9.75l8.332-1.595L12 .587z" />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-2 text-sm text-gray-600 font-bold">
                      {review.rating}/5
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </li>
        ))}
      </ul>
      {visibleCount < reviews.length && (
        <div className=" mt-4">
          <button
            onClick={handleShowMore}
            className="px-4 py-1 text-2xl underline"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};





export default PropertyDetails;
