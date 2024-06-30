import React from 'react';

const PropertySections = ({ property, navigate }) => (
  <div>
    <h2 className="text-xl font-bold mb-4">Sections LMAO</h2>
    {property.sections.map((section, index) => (
      <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
        <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
        <p><strong>Name:</strong> {section.section_name}</p>
        <p><strong>Count:</strong> {section.count}</p>
        <p><strong>Beds:</strong> {section.plan.beds}</p>
        <p><strong>BedRooms:</strong> {section.plan.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {section.plan.bathrooms}</p>
        <p><strong>Guests:</strong> {section.plan.guests}</p>
        <p><strong>Price Per Night:</strong> ${section.price_per_night}</p>
        <p><strong>Image URL:</strong> <a href={section.images[0].url} target="_blank" rel="noopener noreferrer">{section.images[0].url}</a></p>
      </div>
    ))}
    <button
      type="button"
      onClick={() => navigate('/host/add-section', { state: { ...property, stage: 2 } })}
      className="bg-green-500 text-white px-4 py-2 rounded mb-4"
    >
      Add Section
    </button>
  </div>
);

export default PropertySections;
