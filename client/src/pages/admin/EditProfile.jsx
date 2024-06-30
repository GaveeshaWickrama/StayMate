import React, { useState, useEffect,useContext }  from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const EditProfile = () => {

  const { token } = useAuth();

  const [email, setEmail] = useState('Raveesa@gmail.com');
  const [contactNumber, setContactNumber] = useState('(+94) 077-1234567');
  const [address, setAddress] = useState('290 Chatham Way Reston, Maryland (MD), 20191');
  const [nic, setNIC] = useState('20002345434');
  const [gender, setGender] = useState('Male');
  const [obj, setObj] = useState([]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/viewProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setObj(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProfile();
  }, [token]);


  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={obj.firstname}
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={obj.email}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={obj.email}
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mobile"
            />
          </div>

          <div>
            <label className="block text-gray-700">NIC</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="NIC"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="block text-gray-700">Gender</label>
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                id="male"
                className="mr-2"
              />
              <label htmlFor="male" className="mr-4 text-gray-700">Male</label>
              <input
                type="radio"
                name="gender"
                id="female"
                className="mr-2"
              />
              <label htmlFor="female" className="text-gray-700">Female</label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Your Photo</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100"
              >
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
                <input id="file-upload" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
   );
};

export default EditProfile;
