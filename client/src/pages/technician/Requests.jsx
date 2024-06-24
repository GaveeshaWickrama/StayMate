import React, { useState, useEffect } from 'react';
import adminprofilepic from "../../assets/adminprofilepic.png";
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const currentUserID = 1; // Replace with the actual current user ID

    const [requests, setRequests] = useState([]);
    const [profile, setProfile] = useState({
        name: "",
        profession: "",
        email: "",
        address: "",
        nic: "",
        contactNumber: "",
        gender: "", // Assuming gender is part of the data
    });

    // Mock fetch function for getting requests from an API
    const fetchRequests = async () => {
        const data = [
            { id: 1, name: "chamu", profession: "plumber", email: "chamu@gmail.com", address: "colombo", nic: "2001", contactNumber: "071", gender: "Male" },
            { id: 2, name: "sanu", profession: "electrician", email: "sanu@gmail.com", address: "kandy", nic: "2002", contactNumber: "072", gender: "Female" }
        ];
        setRequests(data);
        
        // Find the profile that matches the current user ID
        const matchedProfile = data.find(profile => profile.id === currentUserID);
        if (matchedProfile) {
            setProfile(matchedProfile);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="bg-blue-100 w-full max-w-4xl p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={adminprofilepic}
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                            <p className="text-gray-600">{profile.profession}</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Message</button>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p>{profile.email}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Phone</h2>
                        <p>{profile.contactNumber}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">NIC</h2>
                        <p>{profile.nic}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Gender</h2>
                        <p>{profile.gender}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow col-span-2">
                        <h2 className="text-lg font-semibold">Address</h2>
                        <p>{profile.address}</p>
                    </div>
                    <div className="flex justify-end col-span-2">
                        <Link to="/admin/EditProfile">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L8 9.172V11h1.828l6.586-6.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm4 0a4 4 0 108 0 4 4 0 00-8 0z" clipRule="evenodd" />
                                </svg>
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
