import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [section, setSection] = useState({
    section_name: '',
    count: 1,
    plan: {
      beds: 0,
      living_area: 0,
      bathrooms: 0,
      kitchens: 0,
    },
    price_per_night: 0,
    images: [{ url: '' }],
    amenities: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setSection(prevState => ({
      ...prevState,
      plan: {
        ...prevState.plan,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sections = location.state?.sections || [];
    sections.push(section);
    navigate('/host/add-property', { state: { sections, stage: 2 } });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Add Section Details</h2>
      <div className="mb-4">
        <label className="block mb-1">Section Name:</label>
        <input
          type="text"
          name="section_name"
          value={section.section_name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Count:</label>
        <input
          type="number"
          name="count"
          value={section.count}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Beds:</label>
        <input
          type="number"
          name="beds"
          value={section.plan.beds}
          onChange={handlePlanChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Living Area:</label>
        <input
          type="number"
          name="living_area"
          value={section.plan.living_area}
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
          value={section.plan.bathrooms}
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
          value={section.plan.kitchens}
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
          value={section.price_per_night}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Image URL:</label>
        <input
          type="text"
          name="url"
          value={section.images[0].url}
          onChange={(e) => {
            setSection(prevState => ({
              ...prevState,
              images: [{ url: e.target.value }]
            }));
          }}
          className="block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Section
      </button>
    </form>
  );
};

export default AddSection;

