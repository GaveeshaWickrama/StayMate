import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ProfilePage = () => {
  // return (

    // This is the profile Test

    // <div className="min-h-screen bg-blue-50 flex items-center justify-center">
    //   <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    //     <div className="flex items-center justify-center">
    //       <img
    //         src="https://via.placeholder.com/150"
    //         alt="Profile"
    //         className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
    //       />
    //     </div>
    //     <div className="mt-4 text-center">
    //       <h1 className="text-2xl font-bold text-blue-700">John Doe</h1>
    //       <p className="text-gray-600">john.doe@example.com</p>
    //       <p className="text-gray-600">NIC: 123456789V</p>
    //     </div>
    //     <div className="mt-6">
    //       <div className="text-gray-600">
    //         <p><strong>Joined Date:</strong> January 1, 2020</p>
    //         <p><strong>Position:</strong> Software Engineer</p>
    //         <p><strong>Address:</strong> 1234 Main St, Anytown, USA</p>
    //       </div>
    //     </div>
    //     <div className="mt-6 flex justify-center">
    //       <button className="bg-blue-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-blue-600">
    //         <FaEdit className="mr-2" />
    //         Edit Profile
    //       </button>
    //     </div>
    //   </div>
    // </div>
  // );


    // This is for the Wallet

  

  const transactions = [
    { id: 1, description: 'Payment to John Doe', amount: '-Rs: 200.00', type: 'expense' },
    { id: 2, description: 'Received from Jane Smith', amount: '+Rs: 150.00', type: 'income' },
    { id: 3, description: 'Payment to Amazon', amount: '-Rs: 50.00', type: 'expense' },
    { id: 4, description: 'Received from PayPal', amount: '+Rs: 300.00', type: 'income' },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-800 min-h-screen p-6">
  <div className="max-w-7xl mx-auto py-10 px-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-blue-600">My Wallet</h1>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
        Add Funds
      </button>
    </div>

    {/* Balance Overview */}
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-transform duration-200 hover:scale-105">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Balance Overview</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">Current Points Balance</p>
          <p className="text-3xl font-bold text-blue-600">Rs: 1,230.50</p>
        </div>
        <div>
          <p className="text-gray-500">Last Transaction</p>
          <p className="text-2xl font-bold text-gray-800">Rs: 50.00</p>
        </div>
      </div>
    </div>

    {/* Recent Transactions */}
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-transform duration-200 hover:scale-105">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Points Earned from Previous Reservations</h2>
      <ul>
        {transactions.map(transaction => (
          <li
            key={transaction.id}
            className="flex justify-between items-center border-b py-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <span className="font-medium">{transaction.description}</span>
            <span
              className={
                transaction.type === 'income' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'
              }
            >
              {transaction.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* Quick Actions */}
    <div className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-200 hover:scale-105">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Quick Actions</h2>
      <div className="flex justify-around">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
          Redeem Points
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
           Request Money
        </button>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105">
          View Statements
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProfilePage;
