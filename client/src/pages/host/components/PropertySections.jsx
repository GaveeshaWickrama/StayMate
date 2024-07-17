import React from 'react';
import { useProperty } from '../../../context/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaUserFriends, FaDoorClosed, FaEdit, FaTrashAlt } from 'react-icons/fa';

const PropertySections = () => {
  const { property, setProperty } = useProperty();
  const navigate = useNavigate();

  const handleDelete = (index) => {
    const newSections = property.sections.filter((_, i) => i !== index);
    setProperty((prevProperty) => ({
      ...prevProperty,
      sections: newSections,
    }));
  };

  const handleEdit = (index) => {
    navigate(`/host/edit-section/${index}`);
  };

  return (
    <div className='container mx-auto px-8'>
      <h2 className="text-4xl font-extrabold text-black-600 mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm">Sections</h2>
      {property.sections.map((section, index) => (
        <div key={index} className="mb-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center py-2 mb-4 border-b-4 border-blue-600">
              <h3 className="text-2xl font-semibold">{section.section_name}</h3>
              <p className="text-ml text-gray-600 px-10">Count: {section.count}</p>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit className="text-2xl" />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
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
          <div className="mb-4">
            <label className="block font-semibold mb-2">Images:</label>
            <div className="flex flex-wrap gap-4">
              {section.images && section.images.length > 0 ? (
                section.images.map((image, imgIndex) => (
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
                ))
              ) : (
                <p className="text-lg">No images selected</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Price Per Night:</label>
            <div className="p-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
              <span className="text-lg">${section.price_per_night}</span>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => navigate('/host/add-section')} className="bg-blue-500 text-white px-4 py-2 rounded mb-4" > Add Section </button>
    </div>
  );
};

export default PropertySections;



