import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(1);
  const [property, setProperty] = useState({
    host_id: '', // This should be populated based on the authenticated user
    title: '',
    description: '',
    type: 'House',
    sections: location.state ? location.state.sections : [],
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

  useEffect(() => {
    if (location.state && location.state.sections) {
      setProperty(prevState => ({
        ...prevState,
        sections: location.state.sections
      }));
    }
  }, [location.state]);

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
          <h2 className="text-xl font-bold mb-4">Sections</h2>
          {property.sections.map((section, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold mb-2">Section {index + 1}</h3>
              <p><strong>Name:</strong> {section.section_name}</p>
              <p><strong>Count:</strong> {section.count}</p>
              <p><strong>Beds:</strong> {section.plan.beds}</p>
              <p><strong>Living Area:</strong> {section.plan.living_area}</p>
              <p><strong>Bathrooms:</strong> {section.plan.bathrooms}</p>
              <p><strong>Kitchens:</strong> {section.plan.kitchens}</p>
              <p><strong>Price Per Night:</strong> ${section.price_per_night}</p>
              <p><strong>Image URL:</strong> <a href={section.images[0].url} target="_blank" rel="noopener noreferrer">{section.images[0].url}</a></p>
            </div>
          ))}
          <button
            type="button"
            onClick={() => navigate('/host/add-section', { state: { sections: property.sections } })}
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

