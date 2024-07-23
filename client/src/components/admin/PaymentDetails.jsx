import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import DateFilterForm from "../common/DateFiterForm"; // Import the DateFilterForm component

const PaymentDetails = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAmountToHosts, setTotalAmountToHosts] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);

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
        setFilteredPayments(data);
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

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const formatDateRange = (checkInDate, checkOutDate) => {
    const options = { month: "long", day: "numeric" };
    const checkIn = new Date(checkInDate).toLocaleDateString(
      undefined,
      options
    );
    const checkOut = new Date(checkOutDate).toLocaleDateString(
      undefined,
      options
    );
    return `${checkIn} To ${checkOut}`;
  };

  const handleFilter = ({ startDate, endDate }) => {
    const filtered = payments.filter((payment) => {
      const paymentCheckInDate = new Date(payment.checkInDate);
      const paymentCheckOutDate = new Date(payment.checkOutDate);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return (
        (startDate ? paymentCheckInDate >= start : true) &&
        (endDate ? paymentCheckOutDate <= end : true)
      );
    });
    setFilteredPayments(filtered);
    calculateTotals(filtered);
  };

  if (loading) {
    return <p>Loading PaymentDetails...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment Details
      </h2>

      {/* Date Filter Form */}
      <div className="mb-6">
        <DateFilterForm
          onDateFilterChange={handleFilter}
          onClear={() => setFilteredPayments(payments)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Reservation ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Total Amount
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Service Fee
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Amount to Host
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Payment Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                Host Name
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <React.Fragment key={payment.reservationId}>
                <tr
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {4200 + index}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    RS {payment.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    RS {payment.serviceFee.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    RS {payment.amountToHost.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {payment.paymentStatus ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {payment.hostName}
                  </td>
                </tr>
                {expandedRow === index && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="py-3 px-4">
                      <div className="flex flex-wrap space-x-4">
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2 ml-[20px]">
                          <strong>Reservation ID:</strong> {4200 + index}{" "}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Property Title:</strong> {payment.title}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Total Amount:</strong> RS{" "}
                          {payment.totalAmount.toFixed(2)}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Service Fee:</strong> RS{" "}
                          {payment.serviceFee.toFixed(2)}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Amount to Host:</strong> RS{" "}
                          {payment.amountToHost.toFixed(2)}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Payment Status:</strong>{" "}
                          {payment.paymentStatus ? "Paid" : "Pending"}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Host Name:</strong> {payment.hostName}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Dates:</strong>{" "}
                          {formatDateRange(
                            payment.checkInDate,
                            payment.checkOutDate
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* Revenue and Amount to Hosts Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-3xl text-green-500 mr-4" />
            <h3 className="text-lg font-semibold">Total Revenue</h3>
          </div>
          <p className="text-xl font-bold text-gray-800">
            RS {totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FaUserTie className="text-3xl text-blue-500 mr-4" />
            <h3 className="text-lg font-semibold">Total Payout to Hosts</h3>
          </div>
          <p className="text-xl font-bold text-gray-800">
            RS {totalAmountToHosts.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
