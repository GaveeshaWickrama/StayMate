import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import LocationSearchBar from '../../components/LocationSearch';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({ location: '', radius: '' });

  const fetchProperties = async (params = {}) => {
    const { location = {}, radius = '' } = params;
    const latitude = location?.latitude || '';
    const longitude = location?.longitude || '';

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`, {
        params: { latitude, longitude, radius }
      });
      setProperties(response.data);
      console.log('Fetched properties:', response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (params) => {
    console.log('Search params:', params);
    setSearchParams(params);
    fetchProperties(params);
  };

  return (
    <div className="container mx-auto p-4">
      <LocationSearchBar onSearch={handleSearch} />
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {properties.map(property => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <p>No properties found. Try adjusting your search criteria.</p>
      )}
    </div>
  );
};

export default HomePage;

