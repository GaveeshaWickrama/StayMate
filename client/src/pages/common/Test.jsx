import React from 'react';

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-3/4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6">
            <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">John Doe</h1>
            <p className="text-gray-600 mb-2">johndoe@example.com</p>
            <p className="text-gray-600 mb-2">NIC: 123456789V</p>
            <p className="text-gray-600 mb-4">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mb-6">
              <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Follow</button>
              <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">Message</button>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
              <div className="flex flex-wrap">
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Email: johndoe@example.com</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">NIC: 123456789V</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Phone: (123) 456-7890</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Ratings</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">★★★★★</div>
                <p className="text-gray-700">Great host! Very responsive and the place was exactly as described.</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow">
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">★★★★☆</div>
                <p className="text-gray-700">Nice place, had a good time. Could improve on cleanliness.</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Listed Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img src="https://via.placeholder.com/150" alt="Property 1" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Cozy Apartment</h3>
                <p className="text-gray-600 mt-2">Located in the heart of the city, this cozy apartment offers all amenities for a comfortable stay.</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img src="https://via.placeholder.com/150" alt="Property 2" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Beachside Villa</h3>
                <p className="text-gray-600 mt-2">Enjoy the beach views from this beautiful villa, perfect for a relaxing vacation.</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img src="https://via.placeholder.com/150" alt="Property 3" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Mountain Cabin</h3>
                <p className="text-gray-600 mt-2">Escape to the mountains in this cozy cabin, ideal for nature lovers and adventurers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
