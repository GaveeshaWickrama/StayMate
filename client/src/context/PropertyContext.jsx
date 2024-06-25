import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const PropertyContext = createContext();

// Create a provider component
export const PropertyProvider = ({ children }) => {
  const initialPropertyState = {
    host_id: '',
    title: '',
    description: '',
    type: 'House',
    total_unique_sections: -1,
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
  };

  const [property, setProperty] = useState(initialPropertyState);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    console.log('Property context changed:', property);
  }, [property]);

  const resetProperty = () => {
    setProperty(initialPropertyState);
    setStage(1);
  };

  return (
    <PropertyContext.Provider value={{ property, setProperty, stage, setStage, resetProperty }}>
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperty = () => useContext(PropertyContext);



