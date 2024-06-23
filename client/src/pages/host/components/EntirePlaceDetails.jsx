import React, { useEffect } from 'react';

const EntirePlaceDetails = ({ property, setProperty }) => {
  useEffect(() => {
    console.log('EntirePlaceDetails component rendered');
    // Ensure the sections array has at least one element with a plan object
    if (property.sections.length === 0) {
      setProperty(prevState => ({
        ...prevState,
        sections: [{ plan: { beds: 0, living_area: 0, bathrooms: 0, kitchens: 0 }, price_per_night: 0 }]
      }));
    }
  }, [property.sections.length, setProperty]);

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      sections: [{
        ...prevState.sections[0],
        [name]: value
      }]
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Entire Place Details</h2>
      <div className="mb-4">
        <label className="block mb-1">Living Area:</label>
        <input
          type="number"
          name="living_area"
          value={property.sections[0]?.plan?.living_area || ''}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Beds:</label>
        <input
          type="number"
          name="beds"
          value={property.sections[0]?.plan?.beds || ''}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={property.sections[0]?.plan?.bathrooms || ''}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Kitchens:</label>
        <input
          type="number"
          name="kitchens"
          value={property.sections[0]?.plan?.kitchens || ''}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price Per Night:</label>
        <input
          type="number"
          name="price_per_night"
          value={property.sections[0]?.price_per_night || ''}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
    </div>
  );
};

export default EntirePlaceDetails;





