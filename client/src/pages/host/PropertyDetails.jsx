import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import PropertyAmenitiesDisplay from './components/PropertyAmenitiesDisplay';
import { FaHome, FaClock, FaMapMarkerAlt, FaEnvelope , FaShower  } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill  } from "react-icons/go";
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

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
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'> 
        <h1 className="flex items-center text-4xl font-extrabold text-black-600"> <FaHome className="mr-4" /> {/* House icon */} {property.title} </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3"> <FaClock className="mr-2" /> <span>Added on: {new Date(property.created_at).toLocaleDateString()}</span> </div>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden mb-4">
        <Carousel images={property.images.map(img => ({ url: `${import.meta.env.VITE_API_URL}/${img.url}` }))} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        
        <div className="w-full md:w-2/3 rounded-lg p-1  bg-white shadow">
          <div className="bg-white p-8 flex items-center border-b">
            <FaMapMarkerAlt className="mr-2" /> 
            <p className=" font-semibold"> {capitalizeWords(property.location.address)} {capitalizeWords(property.location.province)}</p>
            <p></p>
          </div>
          <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
            <MdOutlineMeetingRoom className='text-blue-500'/><p>Bedrooms: {property.sections[0].plan.bedrooms}</p>
            <IoBedSharp className='ml-3 text-blue-500'/><p >Beds: {property.sections[0].plan.beds}</p>
            <FaShower className='ml-3 text-blue-500'/><p >Bathrooms: {property.sections[0].plan.bathrooms}</p>
            <GoPersonFill  className='ml-3 text-blue-500'/><p>Guests: {property.sections[0].plan.guests}</p>
          </div>
          <div className="bg-white p-8 flex items-center">
            <h2 className="text-xl font-bold">Rating: </h2>
              <p className='ml-4'>No reviews yet.</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">Hosted By</h2>
          <p className="flex items-center text-gray-800">
            
          </p>
         
        </div>
      </div>

      <div className='w-full bg-white rounded-lg p-6 bg-white shadow mt-2'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className='text-lg'>{property.description}</p> 
        {/* 30 words is good */}
      </div>
      {console.log(property)}
      <PropertyAmenitiesDisplay amenities={property.amenities} />

    </div>
  );
}

export default PropertyDetails;


