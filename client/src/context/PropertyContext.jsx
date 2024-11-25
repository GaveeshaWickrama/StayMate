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
    guests: 1,
  },
  price_per_night: 0,
  individual_sections: [], // To handle multiple subsections
  images: [],
  amenities: [],
};

// Create a provider component
export const PropertyProvider = ({ children }) => {
  const initialPropertyState = {
    host_id: '',
    title: '',
    description: '',
    type: 'House', // Default type
    total_unique_sections: '-1', // Default to "An entire place"
    sections: [sectionTemplate],
    images: [], // Array to hold images for the property
    amenities: [], // Array for property-wide amenities
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
      district: '',
      province: '',
      zipcode: '',
      geocoding_response: '', // Store full geocoding response as string
    },
    deed: null, // Placeholder for uploaded deed
    additionalDetails: '', // Extra details about the property
  };

  const [property, setProperty] = useState(initialPropertyState);
  const [stage, setStage] = useState(1);

  // Log any changes to the property state (useful for debugging)
  useEffect(() => {
    console.log('Property context changed:', property);
  }, [property]);

  // Update location object in the property state
  const updateLocation = (newLocation) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      location: { ...prevProperty.location, ...newLocation },
    }));
  };

  // Update a specific section in the sections array
  const updateSection = (index, newSectionData) => {
    setProperty((prevProperty) => {
      const updatedSections = prevProperty.sections.map((section, idx) =>
        idx === index ? { ...section, ...newSectionData } : section
      );
      return { ...prevProperty, sections: updatedSections };
    });
  };

  // Add a new section
  const addSection = (newSection = sectionTemplate) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      sections: [...prevProperty.sections, newSection],
    }));
  };

  // Remove a section by index
  const removeSection = (index) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      sections: prevProperty.sections.filter((_, idx) => idx !== index),
    }));
  };

  // Update the amenities array (skip WiFi or non-image amenities)
  const updateAmenities = (newAmenities) => {
    const filteredAmenities = newAmenities.map((amenity) =>
      amenity.name === 'WiFi' ? { ...amenity, image: null } : amenity
    );

    setProperty((prevProperty) => ({
      ...prevProperty,
      amenities: filteredAmenities,
    }));
  };

  // Update a specific amenity for a section (skip WiFi or non-image amenities)
  const updateSectionAmenity = (sectionIndex, amenityIndex, newAmenityData) => {
    setProperty((prevProperty) => {
      const updatedSections = prevProperty.sections.map((section, idx) => {
        if (idx === sectionIndex) {
          const updatedAmenities = section.amenities.map((amenity, amenityIdx) =>
            amenityIdx === amenityIndex
              ? {
                  ...amenity,
                  ...newAmenityData,
                  image: amenity.name === 'WiFi' ? null : newAmenityData.image,
                }
              : amenity
          );
          return { ...section, amenities: updatedAmenities };
        }
        return section;
      });
      return { ...prevProperty, sections: updatedSections };
    });
  };

  // Reset property to the initial state
  const resetProperty = () => {
    setProperty(initialPropertyState);
    setStage(1);
  };

  return (
    <PropertyContext.Provider
      value={{
        property,
        setProperty,
        stage,
        setStage,
        resetProperty,
        updateLocation,
        addSection,
        updateSection,
        removeSection,
        updateAmenities,
        updateSectionAmenity,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

// Custom hook to use the PropertyContext
export const useProperty = () => useContext(PropertyContext);
