import React from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaUserFriends, FaDoorClosed } from 'react-icons/fa';

const PropertySections = () => {
  const { property } = useProperty();
  const navigate = useNavigate();

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Sections</h2>
      {property.sections.map((section, index) => (
        <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-semibold">{section.section_name}</h3>
            <p className="text-lg text-gray-600 px-10">Count: {section.count}</p>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="flex items-center mb-4">
              <FaBed className="text-xl mr-2" />
              <p className="text-lg"><strong>Beds:</strong> {section.plan.beds}</p>
            </div>
            <div className="flex items-center mb-4">
              <FaDoorClosed className="text-xl mr-2" />
              <p className="text-lg"><strong>Bedrooms:</strong> {section.plan.bedrooms}</p>
            </div>
            <div className="flex items-center mb-4">
              <FaBath className="text-xl mr-2" />
              <p className="text-lg"><strong>Bathrooms:</strong> {section.plan.bathrooms}</p>
            </div>
            <div className="flex items-center mb-4">
              <FaUserFriends className="text-xl mr-2" />
              <p className="text-lg"><strong>Guests:</strong> {section.plan.guests}</p>
            </div>
          </div>
   
          {section.images && section.images.length > 0 && (
            <div className="mb-4">
              <label className="block font-semibold mb-2">Images:</label>
              <div className="flex flex-wrap gap-4">
                {section.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <img
                      src={image.url}
                      alt={`Section ${index + 1} Image ${imgIndex + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mb-4"> Price Per Night: <p className="">${section.price_per_night}</p> </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => navigate('/host/add-section')}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Section
      </button>
    </div>
  );
};

export default PropertySections;



