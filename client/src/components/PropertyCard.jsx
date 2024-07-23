import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const imageUrl = property.images[0]?.url ? `${import.meta.env.VITE_API_URL}/${property.images[0].url}` : 'path/to/default/image.jpg';

  const formattedPricePerNight = property.sections[0]?.price_per_night 
    ? property.sections[0].price_per_night.toLocaleString() 
    : 'N/A';

  return (
    
    <Link to={`/property-details/${property._id}`} className="max-w-sm w-full md:w-1/3 lg:w-1/4 rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl" >
      <div className="relative h-64">
        <img className="w-full h-full object-cover" src={imageUrl} alt={property.title} />
      </div>
      <div className="px-4 py-4 h-48 flex flex-col justify-between bg-gray-100 rounded-2xl">
        <div>
          <div className="font-bold text-lg mb-2">{property.title}</div>
          <div className="text-gray-700 text-sm mb-2">
            <FaMapMarkerAlt className="inline-block mr-1" />
            {property.location.address}, {property.location.province}
          </div>
          <div className="flex items-center text-gray-700 text-sm mb-2 ">
            <FaBed className="mr-1 text-blue-500" /> {property.sections[0]?.plan?.bedrooms || 'N/A'} Br
            <FaBath className="ml-4 mr-1 text-blue-500" /> {property.sections[0]?.plan?.bathrooms || 'N/A'} Ba
          </div>
        </div>
        <div className="py-2 flex justify-between items-center border-t">
          <span className="text-xl font-bold ">${formattedPricePerNight} / Night</span>
        </div>
      </div>
    </Link>
    
  );
};

export default PropertyCard;



