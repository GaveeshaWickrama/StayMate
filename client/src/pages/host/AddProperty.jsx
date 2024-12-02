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
import DeedUpload from './components/DeedUpload'; // Import DeedUpload component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const { property, setProperty, stage, setStage, resetProperty } = useProperty();
  const totalStages = 8; // Updated total stages
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
  
    // Append all other fields to formData
    Object.keys(property).forEach(key => {
      if (key === 'images') {
        property.images.forEach(image => {
          if (image.file) {  // Check if file exists before appending
            formData.append('images', image.file);
          }
        });
      } else if (key === 'location') {
        Object.keys(property.location).forEach(locKey => {
          formData.append(`location[${locKey}]`, property.location[locKey]);
        });
      } else if (key !== 'sections' && key !== 'deed' && key !== 'amenities') {
        formData.append(key, property[key]);
      }
    });
  
    // Append section data including images
    const sections = property.sections.map(section => {
      const updatedImages = section.images.map(image => {
        if (image.file) {  // Check if file exists before appending
          formData.append('section_images', image.file);
          return { url: image.file.name };
        }
        return image;  // If no file, return existing image object
      });
  
      const updatedAmenities = section.amenities.map(amenity => {
        if (amenity.image?.file) {  // Check if file exists before appending
          formData.append('amenity_images', amenity.image.file);
        }
        return {
          ...amenity,
          image: amenity.image?.file ? { url: amenity.image.file.name } : amenity.image
        };
      });
  
      return {
        ...section,
        images: updatedImages,
        amenities: updatedAmenities
      };
    });
  
    formData.append('sections', JSON.stringify(sections));
  
    // Append property-level amenities and their images
    const updatedPropertyAmenities = property.amenities.map(amenity => {
      if (amenity.image?.file) {  // Check if file exists before appending
        formData.append('amenity_images', amenity.image.file);
      }
      return {
        ...amenity,
        image: amenity.image?.file ? { url: amenity.image.file.name } : amenity.image
      };
    });
  
    formData.append('amenities', JSON.stringify(updatedPropertyAmenities));
  
    // Append the deed file if it exists
    if (property.deed?.file) {
      formData.append('deed', property.deed.file);
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/properties/add`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Property added:', response.data);
      resetProperty();
      navigate('/host/listings', { state: { fromAddProperty: true } });
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
      case 7:
        valid = validateDeedUpload();
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
    // Ensure at least one amenity is selected
    if (property.amenities.length === 0) {
      return false;
    }
  
    // Check that all selected amenities (except WiFi) have images
    return property.amenities.every((amenity) => {
      if (amenity.name === 'WiFi') {
        return true; // WiFi doesn't require an image
      }
      return amenity.image?.url; // Other amenities must have an image URL
    });
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

  const validateDeedUpload = () => {
    return property.deed?.file !== undefined;
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
            <DeedUpload property={property} setProperty={setProperty} />
          )}
          {stage === 8 && (
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
