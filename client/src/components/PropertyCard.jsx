import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  const imageUrl = property.images[0]?.url
    ? `${import.meta.env.VITE_API_URL}/${property.images[0].url}`
    : 'path/to/default/image.jpg';

  let priceDisplay = 'N/A';

  if (property.total_unique_sections === -1) {
    // Entire property, display the price normally
    priceDisplay = property.sections[0]?.price_per_night
      ? `Rs ${property.sections[0].price_per_night.toLocaleString()}`
      : 'N/A';
  } else {
    // Property with sections, calculate min and max price
    const prices = property.sections.map((section) => section.price_per_night);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    priceDisplay = `Rs ${minPrice.toLocaleString()} - Rs ${maxPrice.toLocaleString()}`;
  }

  // Create a truncated list of section types
  const sectionTypes = property.sections
    .map((section) => `${section.section_name}: ${section.count}`)
    .join(', ');

  const truncatedSectionTypes =
    sectionTypes.length > 50 ? `${sectionTypes.slice(0, 47)}...` : sectionTypes;

  return (
    <div className="transform transition duration-300 hover:scale-105">
      <Link
        to={`/property-details/${property._id}`}
        className="max-w-sm w-full md:w-1/3 lg:w-1/4 rounded overflow-hidden shadow-lg bg-white no-underline text-black m-4 hover:shadow-2xl"
      >
        <div className="relative h-64">
          <img className="w-full h-full object-cover" src={imageUrl} alt={property.title} />
        </div>
        <div className="px-4 py-4 h-48 flex flex-col justify-between bg-gray-100 rounded-2xl">
          <div>
            <div
              className="font-bold text-lg mb-2 truncate"
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {property.title}
            </div>
            <div className="text-gray-700 text-sm mb-2">
              <FaMapMarkerAlt className="inline-block mr-1" />
              {property.location.address}, {property.location.province}
            </div>
            {property.total_unique_sections === -1 ? (
              // Display bedrooms and bathrooms for entire property
              <div className="flex items-center text-gray-700 text-sm mb-2">
                <FaBed className="mr-1 text-blue-500" /> {property.sections[0]?.plan?.bedrooms || 'N/A'} Br
                <FaBath className="ml-4 mr-1 text-blue-500" /> {property.sections[0]?.plan?.bathrooms || 'N/A'} Ba
              </div>
            ) : (
              // Display truncated section types for properties with sections
              <div
                className="text-gray-700 text-sm mb-2 truncate"
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <strong>Section Types:</strong> {truncatedSectionTypes}
              </div>
            )}
          </div>
          <div className="py-2 flex justify-between items-center border-t">
            <span className="text-xl font-bold">{priceDisplay} / Night</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
