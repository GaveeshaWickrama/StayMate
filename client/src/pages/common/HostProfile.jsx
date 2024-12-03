import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png';
import useCreateOrSelectConversation from '../../hooks/useCreateOrSelectConversation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const HostProfile = ({ profile, currentUser, id }) => {
  const navigate = useNavigate();
  const { createOrSelectConversation } = useCreateOrSelectConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [properties, setProperties] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProperties = await axios.get(`${import.meta.env.VITE_API_URL}/users/getHostProperties/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(responseProperties.data);

        const responseRatings = await axios.get(`${import.meta.env.VITE_API_URL}/users/getHostRatings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRatings(responseRatings.data);

      } catch (error) {
        toast.error('Failed to load data.');
      }
    };

    fetchData();
  }, [id, token]);

  const handleMessageHost = async () => {
    if (currentUser) {
      setIsLoading(true);
      try {
        await createOrSelectConversation(id);
        navigate(`/host/chat`);
      } catch (error) {
        toast.error('Failed to create or select conversation.');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('User is not logged in');
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-4xl border-r-4 border-transparent"
      style={{ borderImage: 'linear-gradient(to bottom right, blue, lightblue) 1' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start relative">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6 relative">
          <img
            src={
              profile.picture
                ? `${import.meta.env.VITE_API_URL}/${profile.picture}`
                : defaultProfilePic
            }
            alt="Profile"
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        {currentUser && id === currentUser.id && (
          <Link to={`/users/EditProfile/${currentUser.id}`}>
            <div className="flex items-end justify-end h-40 mb-6 md:mb-0 md:mr-6">
              <button
                type="button"
                title="Change Profile"
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1 z-10"
                style={{ transform: 'translateX(-65px)' }}
              >
                <FaEdit size={20} />
              </button>
            </div>
          </Link>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-600 mb-2">{profile.email}</p>
          <div className="flex space-x-4 mb-6">
            {currentUser && id === currentUser.id && (
              <Link to={`/users/EditProfile`}>
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1">
                  Edit Profile
                </button>
              </Link>
            )}
            {currentUser && id !== currentUser.id && (
              <button
                className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full shadow-lg hover:bg-gray-300 transition transform hover:-translate-y-1"
                onClick={handleMessageHost}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner mx-auto"></span>
                ) : (
                  'Message'
                )}
              </button>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Contact Information
            </h2>
            <div className="flex flex-wrap">
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                Position: {capitalizeFirstLetter(profile?.role || '')}
              </span>
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                Phone: {profile.phone}
              </span>
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                NIC/Passport: {profile.nicPassport}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
  <h2 className="text-2xl font-bold text-gray-700 mb-4">Ratings</h2>
  {ratings.length > 0 ? (
    ratings.map((property) => (
      <div key={property.propertyName} className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {property.propertyName}
        </h3>
        {property.reviews.length > 0 ? (
          property.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 shadow-lg transition transform hover:scale-105 mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500 text-sm">{review.username}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet for this property.</p>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-500">No ratings available.</p>
  )}
</div>


      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Listed Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105"
            >
              <img
                src={
                  property.images && property.images.length > 0
                    ? `${import.meta.env.VITE_API_URL}/${property.images[0]?.url}`
                    : "placeholder-image.jpg"
                }
                alt={property.title || "Property Image"}
                className="w-full h-32 sm:h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  {property.title}
                </h3>
                <p className="text-gray-600 mt-2">{property.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
