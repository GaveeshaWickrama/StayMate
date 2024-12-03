import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import LocationSearchBar from '../../components/LocationSearch';
import Map from './Map';
import FilterBar from '../../components/FilterBar';

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchParams, setSearchParams] = useState({ location: '', radius: '' });
  const [filterParams, setFilterParams] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};

      if (searchParams.location?.latitude && searchParams.location?.longitude && searchParams.radius) {
        params.latitude = searchParams.location.latitude;
        params.longitude = searchParams.location.longitude;
        params.radius = searchParams.radius;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties`, { params });

      const allProperties = response.data;
      setProperties(allProperties);
      setFilteredProperties(allProperties);
    } catch (err) {
      console.error('Error fetching properties:', err.message);
      setError('Failed to fetch properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
    setSearchPerformed(true);
    setShowMap(false);
  };

  const handleFilterChange = (name, value) => {
    setFilterParams((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = properties.filter((property) => {
      const { type, minPrice, maxPrice, bedrooms } = filterParams;

      // Parse price range
      const min = minPrice ? parseInt(minPrice, 10) : 0;
      const max = maxPrice ? parseInt(maxPrice, 10) : Infinity;

      // Check if at least one section matches the criteria
      return property.sections.some((section) => {
        return (
          (type ? property.type === type : true) &&
          min <= section.price_per_night &&
          section.price_per_night <= max &&
          (bedrooms ? section.plan?.bedrooms >= parseInt(bedrooms, 10) : true)
        );
      });
    });
    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setFilterParams({});
    setFilteredProperties(properties);
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
      <FilterBar
        onFilterChange={handleFilterChange}
        onFilterSubmit={applyFilters}
        onFilterReset={resetFilters}
      />
      <div className="flex flex-wrap">
        {loading ? (
          <p className="px-2">Loading properties...</p>
        ) : error ? (
          <p className="px-2 text-red-600">{error}</p>
        ) : (
          <div className={`flex flex-wrap ${showMap ? 'w-full md:w-2/3' : 'w-full'} -mx-2`}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property._id}
                  className={`w-full sm:w-1/2 ${
                    showMap ? 'md:w-1/2 lg:w-1/2' : 'md:w-1/3 lg:w-1/4'
                  } px-2 mb-4`}
                >
                  <PropertyCard property={property} />
                </div>
              ))
            ) : (
              <p className="px-2">No properties found. Try adjusting your search criteria.</p>
            )}
          </div>
        )}
        {showMap && (
          <div className="w-full md:w-1/3 px-2 md:px-4 my-4 md:my-0 relative">
            <div className="sticky top-0">
              <Map
                location={searchParams.location}
                radius={searchParams.radius}
                properties={filteredProperties}
              />
              <button
                onClick={toggleMap}
                className="bg-black text-white rounded-md p-3 absolute top-4 right-4 shadow-md hover:bg-blue-600 transition duration-200"
              >
                Hide Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
