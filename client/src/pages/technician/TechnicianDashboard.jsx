import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function AdminDashboard() {

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className="main-container p-5 text-gray-900 bg-gray-100 min-h-screen">
      <div className="main-title flex justify-between">
        <h3 className="text-3xl font-bold py-8">DASHBOARD</h3>
      </div>

      <div className="main-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Jobs done</h3>
            <BsFillArchiveFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">20</h1>
        </div>
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Rating</h3>
            <BsFillGrid3X3GapFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">4.5</h1>
        </div>
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Average Response time</h3>
            <BsPeopleFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">5 hrs</h1>
        </div>
        <div className="card bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
          <div className="card-inner flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Earnings</h3>
            <BsFillBellFill className="card_icon text-2xl" />
          </div>
          <h1 className="text-3xl font-bold">$67</h1>
        </div>
      </div>

      <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20 h-80">
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
