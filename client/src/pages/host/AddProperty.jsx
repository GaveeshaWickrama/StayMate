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
import PropertyAmenities from './components/PropertyAmenities';
import ProgressBar from './components/ProgressBar';
import Publish from './components/Publish';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { property, setProperty, stage, setStage, resetProperty } = useProperty();
  const totalStages = 7;
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
      toast.dismiss(); // Clear any existing toast notifications
    } else {
      toast.error('Please complete all required fields.');
    }
  };

  const handlePrevious = () => {
    setStage(prevStage => prevStage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    const appendPropertyFieldsToFormData = () => {
      Object.keys(property).forEach(key => {
        if (key === 'images') {
          property.images.forEach(image => {
            formData.append('images', image.file); // Assuming image.file is the File object
          });
        } else if (key === 'location') {
          Object.keys(property.location).forEach(locKey => {
            formData.append(`location[${locKey}]`, property.location[locKey]);
          });
        } else if (key !== 'sections') {
          formData.append(key, property[key]);
        }
      });
    };
  
    const handleEntireProperty = () => {
      formData.append('sections', JSON.stringify(property.sections));
      appendPropertyFieldsToFormData();
    };
  
    const handleMultipleSectionsProperty = () => {
      const sections = property.sections.map(section => {
        const updatedImages = section.images.map(image => {
          formData.append('section_images', image.file); // Append file to FormData with a specific key
          return { url: image.file.name }; // You can store the file name or any other identifier
        });
        return { ...section, images: updatedImages };
      });
  
      formData.append('sections', JSON.stringify(sections));
      appendPropertyFieldsToFormData();
    };
  
    if (property.total_unique_sections === "-1") {
      handleEntireProperty();
    } else {
      handleMultipleSectionsProperty();
    }
  
    // Log the FormData entries to inspect them
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
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
    let valid = false;
    switch (stage) {
      case 1:
        valid = validatePropertyDetails();
        break;
      case 2:
        valid = validatePropertyDetailsSection();
        break;
      case 3:
        valid = validatePropertySections() && validatePrice();
        break;
      case 4:
        valid = validateAmenities();
        break;
      case 5:
        valid = validatePropertyImages();
        break;
      case 6:
        valid = validateLocationInformation();
        break;
      default:
        valid = false;
    }
    setIsFormValid(valid);
    return valid;
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

  const validatePrice = () => {
    if (property.total_unique_sections === '-1') {
      return property.sections[0]?.price_per_night > 0;
    } else {
      return property.sections.every(section => section.price_per_night > 0);
    }
  };

  const validateAmenities = () => {
    return property.amenities.length > 0;
  };

  const validatePropertyImages = () => {
    return property.images.length > 0 &&
           property.images.every(image => image.url.trim() !== '');
  };

  const validateLocationInformation = () => {
    return property.location.address?.trim() !== '' &&
           property.location.latitude !== 0 &&
           property.location.longitude !== 0 &&
           property.location.district?.trim() !== '' &&
           property.location.province?.trim() !== '' &&
           property.location.zipcode?.trim() !== '';
  };

  return (
    <div className='flex flex-col h-[calc(100vh-80px)] justify-between bg-white overflow-auto'>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
            <PropertyAmenities property={property} handleChange={handleChange} />
          )}
          {stage === 5 && (
            <PropertyImages property={property} handleChange={handleChange} setProperty={setProperty} />
          )}
          {stage === 6 && (
            <LocationInformation property={property} handleChange={handleChange} navigate={navigate} />
          )}
          {stage === 7 && (
            <Publish handleSubmit={handleSubmit} property={property} />
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





