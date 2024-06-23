import React, { createContext, useState, useContext } from 'react';

// Create a context
const PropertyContext = createContext();

// Create a provider component
export const PropertyProvider = ({ children }) => {
  const [property, setProperty] = useState({
    host_id: '',
    title: '',
    description: '',
    type: 'House',
    total_unique_sections: 1,
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

  return (
    <PropertyContext.Provider value={{ property, setProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperty = () => useContext(PropertyContext);
