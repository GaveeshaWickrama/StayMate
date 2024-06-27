import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

function HostListings() {
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties/host-properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [token]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black-600 mb-6">Your Listings</h1>
      <p className="mb-4 text-gray-600">Manage your property listings here.</p>
      <div className="flex flex-col gap-6">
        {properties.map((property) => (
          <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <img
                src={`${import.meta.env.VITE_API_URL}/${property.images[0]?.url}`}
                alt={property.title}
                className="w-full md:w-1/3 h-48 object-cover"
              />
              <div className="p-4 flex flex-col">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-500 mb-2">{property.title}</h2>
                  <p className="text-gray-700 mb-4">{property.description}</p>
                  <p className="text-gray-600">{property.location.address}</p>
                </div>
                <div className="flex mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HostListings;
