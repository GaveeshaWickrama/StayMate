import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useProperty } from '../../context/PropertyContext';
import PropertyDetails from './components/PropertyDetails';
import PropertyDetailsSection from './components/PropertyDetailsSection';
import PropertySections from './components/PropertySections';
import EntirePlaceDetails from './components/EntirePlaceDetails';
import PropertyImages from './components/PropertyImages';
import LocationInformation from './components/LocationInformation';
import ProgressBar from './components/ProgressBar';

const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, token } = useAuth();
  const { property, setProperty, stage, setStage, resetProperty } = useProperty();
  const totalStages = 5;
  const sidebarWidth = "250px";
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (location.state) {
      setProperty(prevState => ({
        ...prevState,
        ...location.state
      }));
      setStage(location.state.stage || 1);
    }
  }, [location.state, setProperty, setStage]);

  useEffect(() => {
    validateForm();
  }, [property, stage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (isFormValid) {
      setStage(prevStage => prevStage + 1);
    }
  };

  const handlePrevious = () => {
    setStage(prevStage => prevStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties/add`, property, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Property added:', response.data);
      resetProperty(); // Reset context after successful submit
      navigate('/host/your-listings'); // Redirect to Your Listings
    } catch (error) {
      console.error('There was an error adding the property:', error);
    }
  };

  const validateForm = () => {
    switch (stage) {
      case 1:
        setIsFormValid(validatePropertyDetails());
        break;
      case 2:
        setIsFormValid(validatePropertyDetailsSection());
        break;
      case 3:
        setIsFormValid(validatePropertySections());
        break;
      case 4:
        setIsFormValid(validatePropertyImages());
        break;
      case 5:
        setIsFormValid(validateLocationInformation());
        break;
      default:
        setIsFormValid(false);
    }
  };

  const validatePropertyDetails = () => {
    return property.title?.trim() !== '' &&
           property.description?.trim() !== '' &&
           property.type?.trim() !== '';
  };

  const validatePropertyDetailsSection = () => {
    return property.total_unique_sections !== '';
  };

  const validatePropertySections = () => {
    return property.sections.length > 0;
  };

  const validatePropertyImages = () => {
    return property.images.length > 0 &&
           property.images.every(image => image.url.trim() !== '');
  };

  const validateLocationInformation = () => {
    return property.location.address?.trim() !== '' &&
           property.location.latitude !== 0 &&
           property.location.longitude !== 0 &&
           property.location.city?.trim() !== '' &&
           property.location.district?.trim() !== '' &&
           property.location.province?.trim() !== '' &&
           property.location.zipcode?.trim() !== '';
  };

  return (
    <div className='flex flex-col h-screen justify-between bg-white overflow-auto'>
      <div className="m-0 p-10 rounded bg-white overflow-auto">
        <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }} className="mb-8">
          {stage === 1 && (
            <PropertyDetails property={property} handleChange={handleChange} />
          )}
          {stage === 2 && (
            <PropertyDetailsSection property={property} handleChange={handleChange} setProperty={setProperty} />
          )}
          {stage === 3 && (
            parseInt(property.total_unique_sections, 10) === -1 
              ? <EntirePlaceDetails property={property} setProperty={setProperty} />
              : <PropertySections property={property} setProperty={setProperty} navigate={navigate} />
          )}
          {stage === 4 && (
            <PropertyImages property={property} handleChange={handleChange} setProperty={setProperty} />
          )}
          {stage === 5 && (
            <LocationInformation property={property} handleChange={handleChange} navigate={navigate} />
          )}
        </form>
      </div>
      <ProgressBar 
        stage={stage} 
        totalStages={totalStages} 
        sidebarWidth={sidebarWidth} 
        handlePrevious={handlePrevious} 
        handleNext={handleNext} 
        isFormValid={isFormValid}
      />
    </div>
  );
};

export default AddProperty;

