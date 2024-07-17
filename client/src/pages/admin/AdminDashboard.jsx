import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const data = [
    { name: 'January', customers: 300 },
    { name: 'February', customers: 280 },
    { name: 'March', customers: 350 },
    { name: 'April', customers: 400 },
    { name: 'May', customers: 380 },
    { name: 'June', customers: 450 },
    { name: 'July', customers: 420 },
  ];

  const totalSales = 28740; // Use a fixed value for demonstration

  const userTableData = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Online', lastLogin: '7 hours ago' },
    { id: 2, name: 'Jane Smith', role: 'User', status: 'Offline', lastLogin: '1 day ago' },
  ];

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
        <div className="bg-white shadow-md p-5 rounded-md h-96 overflow-auto">
          <h3 className="text-lg font-medium mb-4">Users</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {userTableData.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className={`py-2 px-4 border-b ${user.status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>
                    {user.status}
                  </td>
                  <td className="py-2 px-4 border-b">{user.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
      </div>
    </main>
  );
}

export default AdminDashboard;
