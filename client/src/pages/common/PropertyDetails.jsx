import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "../../components/Carousel";
import PropertyAmenitiesDisplay from "../host/components/PropertyAmenitiesDisplay";
import ReservationSection from "../../components/ReservationSection";
import PropertyHost from "../../components/PropertyHost";
import { useAuth } from "../../context/auth";
import defaultProfileImg from "../../assets/profile.jpg";
import { FaStar } from "react-icons/fa";

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

const PropertyInfo = ({ location, section }) => {
  return (
    <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
      <div className="bg-white p-8 flex items-center border-b">
        <FaMapMarkerAlt className="mr-2" />
        <p className="font-semibold text-xl">
          {capitalizeWords(location.address)}{" "}
          {capitalizeWords(location.province)}
        </p>
      </div>
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
    </div>
  );
};

const PropertyInfoSections = ({ location }) => {
  return (
    <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
      <div className="bg-white p-8 flex items-center border-b">
        <FaMapMarkerAlt className="mr-2" />
        <p className="font-semibold text-xl">
          {capitalizeWords(location.address)}{" "}
          {capitalizeWords(location.province)}
        </p>
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
        <PropertyInfoSections location={property.location} />
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

const PropertyReviews = ({ reviews }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex flex-col items-center bg-gray-50"
            >
              <img
                src={defaultProfileImg}
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-gray-300 mb-2"
              />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold">
                  {review.user.firstName} {review.user.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <FaStar
                      key={starIndex}
                      className={`text-lg ${
                        starIndex < review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-md">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

const DetailedPropertyView = ({ property, id, reviews }) => {
  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <PropertyHeader title={property.title} createdAt={property.created_at} />
      <PropertyImages images={property.images} />
      <div className="flex flex-col md:flex-row gap-4">
        <PropertyInfo
          location={property.location}
          section={property.sections[0]}
        />
        <PropertyHostInfo propertyId={property._id} />
      </div>
      <PropertyDescription description={property.description} />
      <ReservationSection
        propertyId={id}
        sectionId={property.sections[0].section_id}
        nightlyRate={property.sections[0].price_per_night}
        initialCheckInDate="2024-07-11"
        initialCheckOutDate="2024-07-16"
        serviceFeePercentage={10}
      />
      <PropertyAmenitiesDisplay amenities={property.amenities} />
      <PropertyReviews reviews={reviews} />
    </div>
  );
};

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { token } = useAuth(); // Retrieve the token here

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
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/reviews/propertyreviews?propertyId=${id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  if (property.total_unique_sections === -1) {
    return (
      <DetailedPropertyView property={property} id={id} reviews={reviews} />
    );
  } else {
    return <PropertySectionsList property={property} />;
  }
}

export default PropertyDetails;
