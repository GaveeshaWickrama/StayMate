// src/components/PendingPropertyCard.jsx
import React from 'react';
import { FaHouse } from "react-icons/fa6";
import { BsDiamondHalf } from "react-icons/bs";
import { FaMapMarkerAlt, FaUser,FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const PendingPropertyCard = ({ property }) => {
    const imageUrl =  property.propertyID.images[0]?.url ? `${import.meta.env.VITE_API_URL}/${ property.propertyID.images[0].url}` : 'path/to/default/image.jpg';
    const rating=4;

    const renderStars = (rating) => {
        return Array.from({ length: rating }, (_, i) => (
            <FaStar key={i} className="text-yellow-500" />
        ));
    };

    //converting the date
    const date = new Date(property.created_at);

    // Format the date to a readable string
    const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    });


  return (
    <div style={{ width: '300px' }}className="rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 transition-transform transform hover:scale-105 hover:border">
                    {/* max-w-md rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 transition-transform transform hover:scale-105 hover:border */}
       <div className="relative">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={property.propertyID.title} />
        </div>
      <div className="px-4 py-4">
        <div className="flex justify-center mb-2">
            <div className="font-bold text-lg">{property.propertyID.title}</div>
        </div>
        <div className="text-gray-700 text-sm mb-2">
          <FaMapMarkerAlt className="inline-block mr-1" />
          {property.propertyID.location.address}, {property.propertyID.location.province}
        </div>
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <BsDiamondHalf className="mr-1 text-blue-500" /> {property.propertyID.sections[0].section_name === 'entire_place' ? 'Entire Place' : 'Section'}
          <FaHouse className="ml-4 mr-1 text-blue-500" /> {property.propertyID.type} 
          <BsCalendarDate className="ml-4 mr-1 text-blue-500" />{formattedDate}
        </div>
      </div>
      <div className="px-4 py-2 flex justify-center items-center border-t">
       <FaUser className="ml-4 mr-1 text-blue-500" /> {property.propertyID.host_id.firstName} {property.propertyID.host_id.lastName}
       <div className="ml-2 flex items-center">
            {renderStars(rating)}
        </div>
      </div>
      <div className="px-4 py-2 flex justify-between items-center border-t">
        <span className="text-xl font-bold mb-2">{property.propertyID.location.province} | {property.propertyID.location.district}</span> 
      </div>
      <div className="px-4 py-2 flex justify-center">
        <a
            href="#"
            className="font-semibold text-white text-sm px-10 py-2 bg-blue-500 border border-blue-500 rounded mt-2 md:mt-0 md:ml-2 inline-block text-center"
        >
            See more
        </a>
      </div>
     
   
    </div>
  );
};

export default PendingPropertyCard;



