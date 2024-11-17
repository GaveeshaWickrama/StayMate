import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import stripeimg from '../../assets/payments-with-stripe.jpg'; // Adjust the path to your logo

const GetPaymentDetails = () => {
  const { token } = useAuth();
  const [stripeAccountId, setStripeAccountId] = useState('');
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const fetchStripeAccountId = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { accountno } = response.data;
          setStripeAccountId(accountno || '');
        } else {
          console.error('Failed to fetch Stripe account ID. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching the Stripe account ID:', error);
      }
    };

    fetchStripeAccountId();
  }, [token, currentUser.id]);

  const handleChange = (e) => {
    setStripeAccountId(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/addAccountNo`,
        { accountno: stripeAccountId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Stripe Account ID updated successfully');
        window.history.back(); // Optionally reload or redirect the user
      } else {
        alert('Failed to update Stripe Account ID');
      }
    } catch (error) {
      console.error('Error updating Stripe Account ID:', error);
      alert('Error updating Stripe Account ID');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="block text-gray-700">Stripe Account ID</label>
            <input
              type="text"
              name="stripeAccountId"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={stripeAccountId}
              onChange={handleChange}
              placeholder="Enter Stripe Account ID"
            />
          </div>
  
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save
          </button>
        </form>
  
        <p className="mt-4 text-sm text-gray-500">
          Don’t have a Stripe account?{' '}
          <a
            href="https://dashboard.stripe.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Click here to create one
          </a>
        </p>
      </div>
  
      <div className="absolute bottom-0 right-0 mb-4 mr-4">
        <img
          src={stripeimg}
          alt="Your Image"
          className="max-w-[1000%] max-h-[80000%]"
        />
      </div>
    </div>
  );
  
};

export default GetPaymentDetails;
