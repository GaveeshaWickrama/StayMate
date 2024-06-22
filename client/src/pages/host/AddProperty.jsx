import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [stage, setStage] = useState(1);
  const [property, setProperty] = useState({
    host_id: '', // This should be populated based on the authenticated user
    title: '',
    description: '',
    type: 'House',
    total_unique_sections: '',
    sections: [],
    images: [{ url: '' }],
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
      city: '',
      district: '',
      province: '',
      zipcode: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value
      }
    }));
  };

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = property.sections.map((section, sIndex) => {
      if (index !== sIndex) return section;
      return { ...section, [name]: value };
    });
    setProperty(prevState => ({
      ...prevState,
      sections: newSections
    }));
  };

  const handleNext = () => {
    setStage(prevStage => prevStage + 1);
  };

  const handlePrevious = () => {
    if (stage === 4 && property.total_unique_sections > 0) {
      setProperty(prevState => ({
        ...prevState,
        sections: []
      }));
    }
    setStage(prevStage => prevStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/properties/add', property);
      console.log('Property added:', response.data);
    } catch (error) {
      console.error('There was an error adding the property:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded">

      {stage === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Select Property Type</h2>
          <select
            name="type"
            value={property.type}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Cabin">Cabin</option>
            <option value="Hotel">Hotel</option>
          </select>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Are you adding sections?</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="adding_sections"
              value="yes"
              onChange={() => setProperty({ ...property, total_unique_sections: 1 })}
              className="mr-2"
            />
            <label>Yes</label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              name="adding_sections"
              value="no"
              onChange={() => setProperty({ ...property, total_unique_sections: 0, sections: [{ section_name: '', count: 1, plan: { beds: 0, living_area: 0, bathrooms: 0, kitchens: 0 }, price_per_night: 0, images: [{ url: '' }], amenities: [''] }] })}
              className="mr-2"
            />
            <label>No</label>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {stage === 3 && property.total_unique_sections > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">How many unique sections?</h2>
          <input
  type="number"
  name="total_unique_sections"
  value={property.total_unique_sections}
  onChange={(e) => setProperty({ ...property, total_unique_sections: Math.max(1, parseInt(e.target.value) || 1) })}
  min="1"
  className="block w-full p-2 border border-gray-300 rounded"
/>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => {
                const sections = Array.from({ length: property.total_unique_sections }, () => ({
                  section_name: '',
                  count: 1,
                  plan: {
                    beds: 0,
                    living_area: 0,
                    bathrooms: 0,
                    kitchens: 0
                  },
                  price_per_night: 0,
                  images: [{ url: '' }],
                  amenities: ['']
                }));
                setProperty(prevState => ({ ...prevState, sections }));
                handleNext();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {stage === 4 && property.total_unique_sections > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Add Unique Section Details</h2>
          {Array.from({ length: property.total_unique_sections }, (_, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
              <div>
                <label className="block mb-1">Section Name:</label>
                <input
                  type="text"
                  name="section_name"
                  value={property.sections[index]?.section_name || ''}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {/* Add other section fields here similarly */}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {stage === 5 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Property Images</h2>
          {property.images.map((image, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-1">Image URL:</label>
              <input
                type="text"
                name={`image_${index}`}
                value={image.url}
                onChange={(e) => {
                  const newImages = property.images.map((img, imgIndex) => {
                    if (imgIndex !== index) return img;
                    return { ...img, url: e.target.value };
                  });
                  setProperty(prevState => ({
                    ...prevState,
                    images: newImages
                  }));
                }}
                className="block w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setProperty(prevState => ({
              ...prevState,
              images: [...prevState.images, { url: '' }]
            }))}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add More Images
          </button>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

{stage === 6 && (
  <div>
    <h2 className="text-xl font-bold mb-4">Location Information</h2>
    <div>
      <label className="block mb-1">Address:</label>
      <input
        type="text"
        name="address"
        value={property.location.address}
        onChange={handleLocationChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Latitude:</label>
      <input
        type="number"
        name="latitude"
        value={property.location.latitude}
        onChange={handleLocationChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div>
      <label className="block mb-1">Longitude:</label>
      <input
        type="number"
        name="longitude"
        value={property.location.longitude}
        onChange={handleLocationChange}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
    </div>
    <div className="flex justify-between mt-4">
      <button
        type="button"
        onClick={handlePrevious}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  </div>
)}

    </form>
  );
};

export default AddProperty;


