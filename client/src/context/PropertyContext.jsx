import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const PropertyContext = createContext();

// Define section object template
const sectionTemplate = {
  section_name: 'entire_place',
  count: 1,
  plan: {
    beds: 1,
    bedrooms: 1,
    bathrooms: 1,
    guests: 1
  },
  price_per_night: 0,
  individual_sections: [],
  images: [],
  amenities: []
};

// Create a provider component
export const PropertyProvider = ({ children }) => {
  const initialPropertyState = {
    host_id: '',
    title: '',
    description: '',
    type: 'House',
    total_unique_sections: '-1', // Default to "An entire place"
    sections: [sectionTemplate],
    images: [],
    amenities: [], 
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
      district: '',
      province: '',
      zipcode: '',
      geocoding_response: '' // Store as a string
    }
  };

  const [property, setProperty] = useState(initialPropertyState);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    console.log('Property context changed:', property);
  }, [property]);

  const updateLocation = (newLocation) => {
    setProperty(prevProperty => ({
      ...prevProperty,
      location: newLocation
    }));
  };

  const resetProperty = () => {
    setProperty(initialPropertyState);
    setStage(1);
  };

  return (
    <PropertyContext.Provider value={{ property, setProperty, stage, setStage, resetProperty, updateLocation }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperty = () => useContext(PropertyContext);






