import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const PaymentDetails = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAmountToHosts, setTotalAmountToHosts] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/payments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;
        setPayments(data);
        calculateTotals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payments:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchPayments();
    }
  }, [token]);

  const calculateTotals = (payments) => {
    let totalRev = 0;
    let totalToHosts = 0;

    payments.forEach((payment) => {
      totalRev += payment.serviceFee;
      totalToHosts += payment.amountToHost;
    });

    setTotalRevenue(totalRev);
    setTotalAmountToHosts(totalToHosts);
  };

  if (loading) {
    return <p>Loading PaymentDetails...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment Details
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Reservation ID
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Total Amount
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Service Fee
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Amount to Host
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Payment Status
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Host Name
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.reservationId} className="border-b">
                <td className="py-3 px-6 text-sm text-gray-700">
                  {payment.reservationId}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  RS {payment.totalAmount.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  RS {payment.serviceFee.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  RS {payment.amountToHost.toFixed(2)}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {payment.paymentStatus ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Pending</span>
                  )}
                </td>
                <td className="py-3 px-6 text-sm text-gray-700">
                  {payment.hostName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue and Amount to Hosts Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Total Revenue</h3>
          <p className="text-xl font-bold text-gray-800">
            RS {totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Total Amount to Hosts</h3>
          <p className="text-xl font-bold text-gray-800">
            RS {totalAmountToHosts.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
