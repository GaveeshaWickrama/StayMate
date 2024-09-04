import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

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
  }, [token]);

  const handleChange = (e) => {
    setStripeAccountId(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/addAccountNo`, {
        stripeAccountId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Stripe Account ID updated successfully');
        window.location.reload(); // Optionally reload or redirect the user
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
      </div>
    </div>
  );
};

export default GetPaymentDetails;
