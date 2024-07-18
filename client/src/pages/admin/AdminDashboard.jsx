import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const data = [
    { name: 'January', customers: 300, propertyOwners: 150 },
    { name: 'February', customers: 280, propertyOwners: 140 },
    { name: 'March', customers: 350, propertyOwners: 180 },
    { name: 'April', customers: 400, propertyOwners: 200 },
    { name: 'May', customers: 380, propertyOwners: 190 },
    { name: 'June', customers: 450, propertyOwners: 220 },
    { name: 'July', customers: 420, propertyOwners: 210 },
  ];

  const totalSales = 28740; // Use a fixed value for demonstration

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start mb-8">
        <h3 className="text-2xl font-bold py-4">DASHBOARD</h3>
        <div className="bg-blue-100 rounded-md p-4 mb-4">
          <h1 className="text-4xl font-bold">Hello, Raveesha Wickrama!</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Paid Bookings</h3>
            <BsFillArchiveFill className="text-2xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">1,074</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Site Visit</h3>
            <BsFillGrid3X3GapFill className="text-2xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">3,944</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Searchers</h3>
            <BsPeopleFill className="text-2xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">14,743</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Sales</h3>
            <BsFillBellFill className="text-2xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">${totalSales}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white shadow-md p-5 rounded-md h-96">
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

        <div className="bg-white shadow-md p-5 rounded-md h-96">
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
