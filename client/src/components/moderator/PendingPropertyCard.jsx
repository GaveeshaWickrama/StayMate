import React from 'react';
import { BsDiamondHalf, BsCalendarDate } from "react-icons/bs";
import { FaMapMarkerAlt, FaUser, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const PendingPropertyCard = ({ property }) => {
  const imageUrl = property?.images[0]?.url 
    ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${property.images[0].url}` 
    : 'path/to/default/image.jpg';
  const rating = 4;

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <FaStar key={i} className="text-yellow-500" />
    ));
  };

  // Converting the date
  const date = new Date(property.propertyVerifiedCreatedAt);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <div style={{ width: '300px' }} className="rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 transition-transform transform hover:scale-105 hover:border">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={property.title || 'Property Image'} />
      </div>
      <div className="px-4 py-4">
        <div className="flex justify-center mb-2">
          <div className="font-bold text-lg">{property.title || 'No Title'}</div>
        </div>
        {/* <div className="text-gray-700 text-sm mb-2">
          <FaMapMarkerAlt className="inline-block mr-1" />
          {property.location?.address || 'No Address'}, {property.location?.province || 'No Province'}
        </div> */}
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <BsDiamondHalf className="mr-1 text-blue-500" /> 
          {property.sections[0]?.section_name === 'entire_place' ? 'Entire Place' : 'Section'} in {property.type || 'No Type'}
          <BsCalendarDate className="ml-4 mr-1 text-blue-500" /> {formattedDate}
        </div>
      </div>
      <div className="px-4 py-2 flex justify-center items-center border-t">
        <FaUser className="ml-4 mr-1 text-blue-500" /> {property.host_id?.firstName || 'First Name'} {property.host_id?.lastName || 'Last Name'}
        <div className="ml-2 flex items-center">
          {renderStars(rating)}
        </div>
      </div>
   
      <div className="px-4 py-2 flex justify-center items-center border-t">
        {/* <span className="text-xl font-bold mb-2"> */}
          {property.location?.province || 'No Province'} 
          {/* </span> */}
      </div>
      <div className="px-4 py-2 flex justify-center items-center">
        {/* <span className="text-xl font-bold mb-2"> */}
          {property.location?.district || 'No District'}
          {/* </span> */}
      </div>
      <div className="px-4 py-2 flex justify-center">
        <Link
          to={`/moderator/NewPropertySeemore/${property._id || ''}`}
          className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2 inline-block text-center"
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default PendingPropertyCard;



