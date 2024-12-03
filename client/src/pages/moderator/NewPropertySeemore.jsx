import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Carousel from '../../components/Carousel';
import AmenitiesDisplay from '../../components/moderator/AmenitiesDisplay';
import PendingPropertyHost from '../../components/moderator/PendingPropertyHost';
import LocationLink from '../../components/moderator/LocationLink';
import { FaHome, FaClock, FaMapMarkerAlt, FaShower } from 'react-icons/fa';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";
import defaultdeed from "../../assets/deed.jpg";
import ViewDeed from '../../components/moderator/ViewDeed';
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { FaMousePointer } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import RejectionForm from '../../components/moderator/RejectionForm';
import { RiAppsLine } from "react-icons/ri";

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

function NewPropertySeemore() {
  const { token } = useAuth();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const { currentUser, loading } = useAuth();
  const [showRejectionForm, setShowRejectionForm] = useState(false);

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
  }, [id, token]);

  if (loading || !property) {
    return <div>Loading...</div>;
  }

  const handleAccept = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/moderator/acceptProperty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Verified successfully');
        setTimeout(() => {
          window.location.href = '/moderator/viewNewProperties'; // Redirect 
        }, 0); // Set a timeout to ensure the redirect happens after the alert
      } else {
        alert('Failed to accept the property.');
      }
    } catch (error) {
      console.error('Error accepting property:', error);
    }
  };

  const handleReject = async (id, rejectionReason) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/moderator/rejectProperty/${id}`, {
        rejectionReason: rejectionReason,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Rejected successfully');
        setTimeout(() => {
          window.location.href = '/moderator/viewNewProperties'; // Redirect
        }, 0); // Set a timeout to ensure the redirect happens after the alert
      } else {
        alert('Failed to reject the property.');
      }
    } catch (error) {
      console.error('Error rejecting property:', error);
      alert('Error rejecting property. Please try again later.');
    }
  };

  const toggleRejectionForm = () => {
    setShowRejectionForm(!showRejectionForm);
  };

  return (
    <div className="bg-gray-100 mx-auto py-2 px-8">
      <div className='flex mb-1 border-b-4 border-blue-600 p-6 rounded-md shadow-sm bg-white'>
        <h1 className="flex items-center text-4xl font-extrabold text-black-600">
          <FaHome className="mr-4" /> {property.title}
        </h1>
        <div className="flex items-center text-gray-600 ml-6 mt-3">
          <FaClock className="mr-2" /> <span>Added on: {new Date(property.created_at).toLocaleDateString()}</span>
        </div>
        <h1 className="flex items-center ml-auto text-blue-600 font-extrabold">Pending</h1>
      </div>

      <div className="bg-white rounded-lg overflow-hidden mb-4">
        <Carousel images={property.images.map(img => ({ url: `${import.meta.env.VITE_API_URL}/${img.url}` }))} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 rounded-lg p-1 bg-white shadow">
          <div className="bg-white p-8 flex items-center border-b">
            <FaMapMarkerAlt className="mr-2" />
            <p className="font-semibold">
                {capitalizeWords(property.location.address)} 
                <LocationLink
                  latitude={property.location.latitude}
                  longitude={property.location.longitude}
                />
            </p>
          </div>
          <div className="bg-white p-8 flex items-center text-xl gap-4 border-b">
            <MdOutlineMeetingRoom className='text-blue-500' /><p>Bedrooms: {property.sections[0].plan.bedrooms}</p>
            <IoBedSharp className='ml-3 text-blue-500' /><p>Beds: {property.sections[0].plan.beds}</p>
            <FaShower className='ml-3 text-blue-500' /><p>Bathrooms: {property.sections[0].plan.bathrooms}</p>
            <GoPersonFill className='ml-3 text-blue-500' /><p>Guests: {property.sections[0].plan.guests}</p>
          </div>
          <div className="bg-white p-8 flex items-center">
            <h2 className="text-xl font-bold">Province: </h2>
            <p className='ml-4 mr-8'>{capitalizeWords(property.location.province)}   </p>
            
            <h2 className="text-xl font-bold">District: </h2>
            <p className='ml-4'>{capitalizeWords(property.location.district)}</p>
            
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Hosted By</h2>
          <PendingPropertyHost propertyId={id} />
        </div>
      </div>

      <div className='w-full rounded-lg p-6 bg-white shadow mt-2'>
        <div className="flex">
          <div className="flex-shrink-0 pr-4">
            <h2 className="text-xl font-bold mb-2">Assessment Report</h2>
            <div className="flex-shrink-0">
              <ViewDeed
                image={property.deed}
                defaultImage={defaultdeed}
              />
            </div>
          </div>
          <div className="flex-grow px-4 border-l border-r border-gray-300">
            <h2 className="text-xl font-bold mb-2 text-center">Things to Know</h2>
            {/* <p className="text-lg flex items-center">< RiAppsLine style={{ color: '#2563eb' }} className="mr-2" /> Be aware of neighbour's dogs.</p> */}
            {/* <p className="text-lg flex items-center">< RiAppsLine style={{ color: '#2563eb' }} className="mr-2" /> The road shows in google maps .</p> */}
            <p className="text-lg flex items-center">Nothing</p>
          </div>
          <div className="flex-grow pl-4">
            <h2 className="text-xl font-bold mb-2 text-center">Description</h2>
            <p className="text-lg">{property.description}</p>
          </div>
        </div>
      </div>

      <AmenitiesDisplay amenities={property.amenities} />

      {/* <div className='p-6 bg-white rounded-lg shadow-md mt-2'> */}
      <div className="flex justify-center my-10">
        {!showRejectionForm && (
          <>
            <button 
              className="bg-red-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
              onClick={toggleRejectionForm}
            >
              Reject
            </button>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
              onClick={() => handleAccept(property._id)}
            >
              Accept
            </button>
          </>
        )}
        
        {showRejectionForm && (
          <RejectionForm
            propertyId={property._id}
            token={token}
            currentUser={currentUser}
            onClose={() => setShowRejectionForm(false)}
            onSubmit={(rejectionReasons) => handleReject(property._id, rejectionReasons)}
          />
        )}
      </div>
    </div>
  );
}

export default NewPropertySeemore;
