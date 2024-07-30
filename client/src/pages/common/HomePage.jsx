import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import LocationSearchBar from '../../components/LocationSearch';
import Map from './Map';
// import FilterBar from '../../components/FilterBar';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({ location: '', radius: '' });
  const [showMap, setShowMap] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed

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
    setShowMap(true); // Automatically show the map after a search
    setSearchPerformed(true); // Mark that a search has been performed
  };

  const handleFilterChange = (name, value) => {
    // Implement the logic to handle filter changes
    // This could involve updating the searchParams state and refetching properties
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <LocationSearchBar onSearch={handleSearch} />
        {searchPerformed && !showMap && (
          <button
            onClick={toggleMap}
            className="bg-black text-white rounded-md p-3 ml-4 shadow-md hover:bg-blue-600 transition duration-200"
          >
            Show Map
          </button>
        )}
      </div>
      {/* <FilterBar onFilterChange={handleFilterChange} /> */}
      <div className="flex flex-wrap">
        <div className={`flex flex-wrap ${showMap ? 'w-full md:w-2/3' : 'w-full'} -mx-2`}>
          {properties.length > 0 ? (
            properties.map(property => (
              <div key={property._id} className={`w-full sm:w-1/2 ${showMap ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/4'} px-2 mb-0`} >
                <PropertyCard property={property} />
              </div>
            ))
          ) : (
            <p className="px-2">No properties found. Try adjusting your search criteria.</p>
          )}
        </div>
        {showMap && (
          <div className="w-full md:w-1/3 px-2 md:px-4 my-4 md:my-0 relative">
            <div className="sticky top-0">
              <Map location={searchParams.location} radius={searchParams.radius} properties={properties} />
              <button onClick={toggleMap} className="bg-black text-white rounded-md p-3 absolute top-4 right-4 shadow-md hover:bg-blue-600 transition duration-200" > Hide Map </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
