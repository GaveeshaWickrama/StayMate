import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import { FaHome, FaClock, FaMapMarkerAlt, FaCity, FaBuilding, FaMapPin, FaEnvelope } from 'react-icons/fa';

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-gray-200 mx-auto p-6">
      <div className='flex mb-8 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'> 
        <h1 className="flex items-center text-4xl font-extrabold text-black-600"> <FaHome className="mr-4" /> {/* House icon */} {property.title} </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3"> <FaClock className="mr-2" /> <span>Added on: {new Date(property.created_at).toLocaleDateString()}</span> </div>
      </div>
      
  
      <div className="bg-white rounded-lg overflow-hidden mb-8">
        <Carousel images={property.images.map(img => ({ url: `${import.meta.env.VITE_API_URL}/${img.url}` }))} />
      </div>

      <div className='flex space-x-8'>
        <div className="w-2/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8 ">
          <h2 className="flex items-center text-2xl font-bold mb-4"> <FaMapPin className="mr-2 text-gray-600" />  Address Details</h2>
          <div className=""> <span>{property.location.address}</span> </div>
          <div className=""> <span>{property.location.city}</span> </div>
          <div className=""> <span>{property.location.district}</span> </div>
          <div className=""> <span>{property.location.province}</span> </div>
          <div className=""> <span>{property.location.zipcode}</span> </div>
        </div>
        <div className='w-2/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8 bg-gray-200'>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="mb-4">{property.description}</p>
        </div>
        <div className='w-1/5 bg-white shadow-lg rounded-lg overflow-hidden p-6 mb-8 bg-gray-200'>
          <h2 className="text-2xl font-bold mb-4">Hosted By</h2>
          
        </div>
      </div>

    </div>
  );
}

export default PropertyDetails;


