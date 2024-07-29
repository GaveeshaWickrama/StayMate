import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useHeaderContext } from '../../hooks/useHeaderContext'; // Correctly import the custom hook

const EditProfile = () => {
  const { token, currentUser, loading } = useAuth(); 
  const { dispatch } = useHeaderContext(); // Use the custom hook to get dispatch from HeaderContext
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nicPassport: '',
    gender: '',
    address: '',
    picture: ''
  });
  const [photo, setPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const json = response.data;
          setProfile(json);
          if (json.picture) {
            setPreviewUrl(`${import.meta.env.VITE_API_URL}/${json.picture}`);
          }
        } else {
          console.error('Failed to fetch profile. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching the profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.keys(profile).forEach((key) => {
      formData.append(key, profile[key]);
    });
  
    if (photo) {
      formData.append('photo', photo);
    }
  
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/editProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Profile Updated successfully');
  
        // Update the header context with the new profile data
        dispatch({
          type: 'SET_HEADER_DATA',
          payload: {
            ...profile,
            picture: response.data.picture, // Use the picture URL from the response
          }
        });
  
        // Redirect to the profile page
        setTimeout(() => {
          window.location.href = `viewProfile/${currentUser.id}`;
        }, 0);
      } else {
        alert('Failed to submit updated details');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-4" onSubmit={handleSave} encType="multipart/form-data">
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={profile.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Mobile"
            />
          </div>

          <div>
            <label className="block text-gray-700">NIC/Passport</label>
            <input
              type="text"
              name="nicPassport"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={profile.nicPassport}
              onChange={handleChange}
              placeholder="NIC/Passport"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Profile Picture</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 4a3 3 0 116 0 3 3 0 01-6 0zm1 7a4 4 0 108 0H8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600">Click to upload or drag and drop</span>
                    <span className="text-gray-500 text-sm">SVG, PNG or JPG (max. 800x400px)</span>
                  </>
                )}
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
