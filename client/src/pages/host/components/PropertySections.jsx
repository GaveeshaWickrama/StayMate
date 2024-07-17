import React from 'react';
import { useProperty } from '../../../context/PropertyContext' ; 
import { useNavigate } from 'react-router-dom';

const PropertySections = () => {
  const { property } = useProperty();
  const navigate = useNavigate();

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Sections</h2>
      {property.sections.map((section, index) => (
        <div key={index} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Section {index + 1}</h3>
          <div className="mb-4">
            <label className="block font-semibold">Name:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.section_name}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Count:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.count}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Beds:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.plan.beds}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Bedrooms:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.plan.bedrooms}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Bathrooms:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.plan.bathrooms}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Guests:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">{section.plan.guests}</p>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Price Per Night:</label>
            <p className="p-2 border border-gray-300 rounded-lg bg-white">${section.price_per_night}</p>
          </div>
          {section.images && section.images[0] && (
            <div className="mb-4">
              <label className="block font-semibold">Image URL:</label>
              <a href={section.images[0].url} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-300 rounded-lg bg-white block text-blue-500">{section.images[0].url}</a>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => navigate('/host/add-section')}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Section
      </button>
    </div>
  );
};

export default PropertySections;
