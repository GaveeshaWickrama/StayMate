import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-500 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-white">StayMate</span>
          </div>
          <nav>
            <Link to="/login" className="text-white hover:text-blue-200 mx-2">Login</Link>
            <Link to="/signup" className="text-white hover:text-blue-200 mx-2">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="bg-blue-100 py-12 rounded-lg shadow-md mb-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">Find Your Perfect Stay with StayMate</h1>
            <p className="text-gray-700 mb-8">Discover amazing properties for rent and sale, tailored to your needs.</p>
            <Link to="/properties" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400">
              Browse Properties
            </Link>
          </div>
        </section>

        <section className="bg-white py-12 rounded-lg shadow-md mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">How It Works</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Search</h3>
                  <p className="text-gray-700">Find properties that match your preferences.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Book</h3>
                  <p className="text-gray-700">Secure your booking easily and quickly.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Enjoy</h3>
                  <p className="text-gray-700">Experience a memorable stay with StayMate.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-100 py-12 rounded-lg shadow-md mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Popular Properties</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/400x300" alt="Property 1" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Luxury Villa</h3>
                    <p className="text-gray-700 mb-4">$250/night</p>
                    <Link to="/property/1" className="text-blue-500 hover:text-blue-400">View Details</Link>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400 ml-4">
                      Book Property
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/400x300" alt="Property 2" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Modern Apartment</h3>
                    <p className="text-gray-700 mb-4">$150/night</p>
                    <Link to="/property/2" className="text-blue-500 hover:text-blue-400">View Details</Link>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400 ml-4">
                      Book Property
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src="https://via.placeholder.com/400x300" alt="Property 3" className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Cozy Cottage</h3>
                    <p className="text-gray-700 mb-4">$100/night</p>
                    <Link to="/property/3" className="text-blue-500 hover:text-blue-400">View Details</Link>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-400 ml-4">
                      Book Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 rounded-lg shadow-md mb-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Why Choose StayMate?</h2>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Wide Variety of Properties</h3>
                  <p className="text-gray-700">From luxurious villas to cozy cottages, we have it all.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Easy Booking Process</h3>
                  <p className="text-gray-700">Book your stay in just a few clicks.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Customer Support</h3>
                  <p className="text-gray-700">24/7 customer support to assist you with your needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-500 py-6">
        <div className="container mx-auto px-6 text-center text-white">
          <p>&copy; 2024 StayMate. All rights reserved.</p>
          <nav className="mt-4">
            <Link to="/about" className="text-white hover:text-blue-200 mx-2">About Us</Link>
            <Link to="/contact" className="text-white hover:text-blue-200 mx-2">Contact</Link>
            <Link to="/privacy" className="text-white hover:text-blue-200 mx-2">Privacy Policy</Link>
            <Link to="/terms" className="text-white hover:text-blue-200 mx-2">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
