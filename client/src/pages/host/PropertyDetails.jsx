import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaHome, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 bg-gray-100 rounded-md shadow-sm">{property.title}</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex">
          <img 
            src={`${import.meta.env.VITE_API_URL}/${property.images[0]?.url}`}
            alt={property.title}
            className="w-1/2 h-96 object-cover"
          />
          <div className="flex flex-col justify-between pl-6 w-1/2">
            <div>
              <h2 className="text-2xl font-semibold text-black-500 mb-2 pt-3">{property.title}</h2>
              <div className="flex items-center mb-2">
                <FaInfoCircle className="text-blue-500 mr-2" />
                <p className="text-gray-700">{property.description}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaHome className="text-blue-500 mr-2" />
                <p className="text-gray-700">{property.type}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <p className="text-gray-600">
                  {property.location.address}, {property.location.city}, {property.location.district}, {property.location.province}, {property.location.zipcode}
                </p>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <p className="text-gray-700">Added on: {new Date(property.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-black-500 mb-2">Sections</h3>
          {property.sections.map((section) => (
            <div key={section.section_id} className="mb-4">
              <h4 className="text-xl font-semibold text-black-500">{section.section_name}</h4>
              <p className="text-gray-700">Beds: {section.plan.beds}</p>
              <p className="text-gray-700">Living Area: {section.plan.living_area} sqft</p>
              <p className="text-gray-700">Bathrooms: {section.plan.bathrooms}</p>
              <p className="text-gray-700">Kitchens: {section.plan.kitchens}</p>
              <p className="text-gray-700">Price per night: ${section.price_per_night}</p>
              <div className="flex">
                {section.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API_URL}/${image.url}`}
                    alt={`Section ${index + 1}`}
                    className="w-1/4 h-24 object-cover mr-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
