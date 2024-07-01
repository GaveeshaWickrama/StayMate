import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function AdminDashboard() {
  const data = [
    { name: 'January', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'February', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'March', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'April', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'June', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'July', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold py-8">DASHBOARD</h3>
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
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default AdminDashboard;
