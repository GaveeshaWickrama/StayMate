import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function AdminDashboard() {
  const data = [
    { name: 'January', income: 4000, expenses: 2400, amt: 2400 },
    { name: 'February', income: 3000, expenses: 1398, amt: 2210 },
    { name: 'March', income: 2000, expenses: 9800, amt: 2290 },
    { name: 'April', income: 2780, expenses: 3908, amt: 2000 },
    { name: 'May', income: 1890, expenses: 4800, amt: 2181 },
    { name: 'June', income: 2390, expenses: 3800, amt: 2500 },
    { name: 'July', income: 3490, expenses: 4300, amt: 2100 },
  ];

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start">
        <h3 className="text-2xl font-bold py-8">DASHBOARD</h3> 
        <h3 className="text-4xl font-bold py-2">Hello, Sameera Perera</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Paid Bookings</h3>
            <BsFillArchiveFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">1,074</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Site Visit</h3>
            <BsFillGrid3X3GapFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">3,944</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Searchers</h3>
            <BsPeopleFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">14,743</h1>
        </div>
        <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Sales</h3>
            <BsFillBellFill className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">$6,766</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expenses" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashboard;
