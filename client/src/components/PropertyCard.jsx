// src/components/PropertyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const imageUrl = property.images[0]?.url ? `${import.meta.env.VITE_API_URL}/${property.images[0].url}` : 'path/to/default/image.jpg';

  const formattedPricePerNight = property.sections[0]?.price_per_night 
    ? property.sections[0].price_per_night.toLocaleString() 
    : 'N/A';

  return (
    <Link to={`/property-details/${property._id}`} className="max-w-sm rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 transition-transform transform hover:scale-105 hover:border">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imageUrl} alt={property.title} />
        {/* <div className="absolute top-2 left-2 flex space-x-2">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">FEATURED</span>
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">FOR SALE</span>
        </div> */}
      </div>
      <div className="px-4 py-4">
        <div className="font-bold text-lg mb-2">{property.title}</div>
        <div className="text-gray-700 text-sm mb-2">
          <FaMapMarkerAlt className="inline-block mr-1" />
          {property.location.address}, {property.location.province}
        </div>
        <div className="flex items-center text-gray-700 text-sm mb-2">
          <FaBed className="mr-1 text-blue-500" /> {property.sections[0]?.plan?.bedrooms || 'N/A'} Br
          <FaBath className="ml-4 mr-1 text-blue-500" /> {property.sections[0]?.plan?.bathrooms || 'N/A'} Ba
        </div>
      </div>
      <div className="px-4 py-2 flex justify-between items-center border-t">
        <span className="text-xl font-bold mb-2">${formattedPricePerNight} / Night</span>
      </div>
    </Link>
  );
};

export default PropertyCard;



