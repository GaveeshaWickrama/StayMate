// src/components/PropertyCard.jsx
import React from 'react';
import { FaMapMarkerAlt, FaBed, FaBath, FaHome } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const imageUrl = property.images[0]?.url ? `${import.meta.env.VITE_API_URL}/${property.images[0].url}` : 'path/to/default/image.jpg';

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={property.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.title}</div>
        <p className="text-gray-700 text-base mb-4">{property.description}</p>
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <p>{property.location.address}, {property.location.province}</p>
        </div>
        <div className="flex items-center mb-2">
          <FaBed className="mr-2" />
          <p>{property.sections[0].plan.bedrooms} Bedrooms</p>
        </div>
        <div className="flex items-center mb-2">
          <FaBath className="mr-2" />
          <p>{property.sections[0].plan.bathrooms} Bathrooms</p>
        </div>
        <div className="flex items-center">
          <FaHome className="mr-2" />
          <p>{property.type}</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">
          ${property.sections[0].price_per_night} / night
        </span>
      </div>
    </div>
  );
};

export default PropertyCard;
