import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [stage, setStage] = useState(1);
  const [property, setProperty] = useState({
    host_id: '', // This should be populated based on the authenticated user
    title: '',
    description: '',
    type: 'House',
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

  const handleAddSection = () => {
    setProperty(prevState => ({
      ...prevState,
      sections: [
        ...prevState.sections,
        {
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
        }
      ]
    }));
  };

  const handleRemoveSection = (index) => {
    setProperty(prevState => ({
      ...prevState,
      sections: prevState.sections.filter((_, sIndex) => sIndex !== index)
    }));
  };

  const handleNext = () => {
    setStage(prevStage => prevStage + 1);
  };

  const handlePrevious = () => {
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
          <h2 className="text-xl font-bold mb-4">Add Section Details</h2>
          {property.sections.map((section, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemoveSection(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div>
                <label className="block mb-1">Section Name:</label>
                <input
                  type="text"
                  name="section_name"
                  value={section.section_name}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Beds:</label>
                <input
                  type="number"
                  name="beds"
                  value={section.plan.beds}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Living Area:</label>
                <input
                  type="number"
                  name="living_area"
                  value={section.plan.living_area}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Bathrooms:</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={section.plan.bathrooms}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Kitchens:</label>
                <input
                  type="number"
                  name="kitchens"
                  value={section.plan.kitchens}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price Per Night:</label>
                <input
                  type="number"
                  name="price_per_night"
                  value={section.price_per_night}
                  onChange={(e) => handleSectionChange(index, e)}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Image URL:</label>
                <input
                  type="text"
                  name="url"
                  value={section.images[0].url}
                  onChange={(e) => {
                    const newSections = property.sections.map((sec, sIndex) => {
                      if (index !== sIndex) return sec;
                      return { 
                        ...sec, 
                        images: [{ url: e.target.value }]
                      };
                    });
                    setProperty(prevState => ({
                      ...prevState,
                      sections: newSections
                    }));
                  }}
                  className="block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSection}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Section
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

      {stage === 3 && (
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

      {stage === 4 && (
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
          {/* Add other location fields here similarly */}
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



