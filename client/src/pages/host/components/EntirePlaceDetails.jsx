// src/components/EntirePlaceDetails.js
import React, { useEffect } from 'react';

const EntirePlaceDetails = ({ property, setProperty }) => {
  useEffect(() => {
    console.log('EntirePlaceDetails component rendered');
    if (property.sections.length === 0) {
      setProperty(prevState => ({
        ...prevState,
        sections: [{
          section_name: 'entire_place',
          count: 1,
          plan: { beds: 1, bedrooms: 1, bathrooms: 1, guests: 1 },
          price_per_night: 0
        }]
      }));
    }
  }, [property.sections.length, setProperty]);

  const handlePlanChange = (name, value) => {
    setProperty(prevState => {
      const updatedPlan = {
        ...prevState.sections[0]?.plan,
        [name]: value
      };

      const updatedSection = {
        ...prevState.sections[0],
        plan: updatedPlan
      };

      return {
        ...prevState,
        sections: [updatedSection]
      };
    });
  };

  const handleChange = (name, value) => {
    setProperty(prevState => ({
      ...prevState,
      sections: [{
        ...prevState.sections[0],
        [name]: value
      }]
    }));
  };

  const renderNumberInput = (label, name, value, handleChange, min = 0) => (
    <div className="mb-4 w-1/5 flex items-center justify-between">
      <label className="block font-medium text-gray-900">{label}</label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => handleChange(name, Math.max(min, value - 1))}
          className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >-</button>
        <input
          type="text"
          name={name}
          value={value}
          readOnly
          className="py-2 w-12 text-center border-t border-b border-gray-300"
        />
        <button
          type="button"
          onClick={() => handleChange(name, value + 1)}
          className="px-3 py-2 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
        >+</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-8">
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Property Section Info</h2>
      <div className='p-6'> 
      <p className="mb-8 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <div className="flex-col space-y-6">
        {renderNumberInput("Guests", "guests", property.sections[0]?.plan?.guests || 1, handlePlanChange, 1)}
        {renderNumberInput("Bedrooms", "bedrooms", property.sections[0]?.plan?.bedrooms || 1, handlePlanChange, 1)}
        {renderNumberInput("Beds", "beds", property.sections[0]?.plan?.beds || 1, handlePlanChange, 1)}
        {renderNumberInput("Bathrooms", "bathrooms", property.sections[0]?.plan?.bathrooms || 1, handlePlanChange, 1)}
      </div>
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-lg font-bold mb-4">Price Per Night</h3>
          <div className="flex items-center text-lg" >
            <label className="block font-medium text-gray-900 mr-4">Price:</label>
            <input
              type="number"
              name="price_per_night"
              value={property.sections[0]?.price_per_night}
              onChange={e => handleChange('price_per_night', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
              min="0"
            />
            <span className="ml-2 text-gray-600">Rs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntirePlaceDetails;







