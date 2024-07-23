import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaStar, FaPhone, FaEnvelope } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile.jpg'; // Adjust the path as necessary
import { useAuth } from '../../context/auth'; // Adjust the path as necessary

const PropertyHost = ({ propertyId }) => {
  const [host, setHost] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties/${propertyId}/host`);
        setHost(response.data);
        console.console.log(host);
      } catch (error) {
        console.error('Error fetching host:', error);
      }
    };

    fetchHost();
  }, [propertyId]);

  if (!host) {
    return <div>Loading...</div>;
  }

  const hostImage = host.picture ? `${import.meta.env.VITE_API_URL}/${host.picture}` : defaultProfilePic;

  const hostDetails = {
    image: hostImage,
    name: `${host.firstName} ${host.lastName}`,
    reviews: host.reviews || 14, // Replace with actual number of reviews if available
    rating: host.rating || 4.93, // Replace with actual rating if available
    createdOn: new Date(host.createdOn).toLocaleDateString(), // Format the date account was created
    phone: host.phone
  };

  const handleMessageHost = () => {
    if (currentUser) {
      navigate(`/chat?currentUserId=${currentUser.id}&hostId=${host._id}`);
    } else {
      // Handle case where user is not logged in
      console.error('User is not logged in');
    }
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg">
      <div className="flex flex-col items-center mr-4">
        <img src={hostDetails.image} alt="Host" className="w-40 h-40 rounded-full mb-2" />
        <Link to={`/users/ViewProfile/${host._id}`}>
            <h3 className="text-lg font-bold">{hostDetails.name}</h3>
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-xl font-bold mb-2">{hostDetails.reviews} Reviews</div>
        <div className="flex items-center justify-start mb-2">
          <FaStar className="text-yellow-500 mr-1" size={24} />
          <span className="text-lg font-bold">{hostDetails.rating}</span>
        </div>
        <div className="flex items-center justify-start mb-2">
          <FaPhone className="mr-2" size={24} />
          <span>{hostDetails.phone}</span>
        </div>
        <div className="text-gray-500 mb-4">Joined on {hostDetails.createdOn}</div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold inline-flex items-center"
          onClick={handleMessageHost}
        >
          <FaEnvelope className="mr-2" size={24} />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyHost;
