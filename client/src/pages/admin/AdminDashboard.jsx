import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import adminprofilepic from "../../assets/adminprofilepic.png";
import axios from 'axios';
import { useAuth } from '../../context/auth';

function AdminDashboard() {
  const monthlyData = [
    { name: 'January', customers: 300, propertyOwners: 150 },
    { name: 'February', customers: 280, propertyOwners: 140 },
    { name: 'March', customers: 350, propertyOwners: 180 },
    { name: 'April', customers: 400, propertyOwners: 200 },
    { name: 'May', customers: 380, propertyOwners: 190 },
    { name: 'June', customers: 450, propertyOwners: 220 },
    { name: 'July', customers: 420, propertyOwners: 210 },
  ];

  const yearlyData = [
    { name: '2019', customers: 2400, propertyOwners: 1200 },
    { name: '2020', customers: 2600, propertyOwners: 1300 },
    { name: '2021', customers: 2800, propertyOwners: 1400 },
    { name: '2022', customers: 3000, propertyOwners: 1500 },
    { name: '2023', customers: 3200, propertyOwners: 1600 },
  ];

  const totalSales = 28740; // Use a fixed value for demonstration
  const { token } = useAuth();
  const [profile, setProfile] = useState({ firstname: '', lastname: '', role: '' });
  const [view, setView] = useState('monthly');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/viewProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const data = view === 'monthly' ? monthlyData : yearlyData;

  return (
    <main className="p-2 text-gray-900 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start mb-4">
        <h3 className="text-3xl font-bold py-2">DASHBOARD</h3>
        <div className="bg-white rounded-md p-10 mb-4 w-full shadow-outline">
          <h1 className="text-5xl font-bold">Hello, Raweesha Wickrama {profile.firstname} {profile.lastname}!</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around border-l-4 border-blue-500 h-24 shadow-outline">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Paid Bookings</h3>
            <BsFillArchiveFill className="text-xl text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">1,074</h1>
        </div>
        <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around border-l-4 border-blue-500 h-24 shadow-outline">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Site Visit</h3>
            <BsFillGrid3X3GapFill className="text-xl text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">3,944</h1>
        </div>
        <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around border-l-4 border-blue-500 h-24 shadow-outline">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Searchers</h3>
            <BsPeopleFill className="text-xl text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">14,743</h1>
        </div>
        <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around border-l-4 border-blue-500 h-24 shadow-outline">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium">Total Sales</h3>
            <BsFillBellFill className="text-xl text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold">${totalSales}</h1>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={() => handleViewChange('monthly')} className={`px-4 py-2 rounded-md ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>
          Monthly
        </button>
        <button onClick={() => handleViewChange('yearly')} className={`ml-2 px-4 py-2 rounded-md ${view === 'yearly' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`}>
          Yearly
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white shadow-md p-5 rounded-md h-80 shadow-outline">
          <h3 className="text-lg font-medium mb-4">Customers</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md p-5 rounded-md h-80 shadow-outline">
          <h3 className="text-lg font-medium mb-4">Property Owners</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="propertyOwners" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
