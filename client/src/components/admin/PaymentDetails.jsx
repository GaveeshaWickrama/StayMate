import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { FaMoneyBillWave, FaUserTie } from "react-icons/fa";
import DateFilterForm from "../common/DateFiterForm";
import { fetchPaymentsAndTotals } from "../../services/paymentService";

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
      const { payments, totalRevenue, totalAmountToHosts } =
        await fetchPaymentsAndTotals(token);
      setPayments(payments);
      setFilteredPayments(payments);
      setTotalRevenue(totalRevenue);
      setTotalAmountToHosts(totalAmountToHosts);
      setLoading(false);
    };

    if (token) {
      fetchPayments();
    }
  }, [token]);

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

    let totalRev = 0;
    let totalToHosts = 0;

    filtered.forEach((payment) => {
      totalRev += payment.serviceFee;
      totalToHosts += payment.amountToHost;
    });

    setTotalRevenue(totalRev);
    setTotalAmountToHosts(totalToHosts);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return <p>Loading PaymentDetails...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Payment Details
      </h2>

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
                    {formatCurrency(payment.totalAmount)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {formatCurrency(payment.serviceFee)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {formatCurrency(payment.amountToHost)}
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
                          <strong>Total Amount:</strong>{" "}
                          {formatCurrency(payment.totalAmount)}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Service Fee:</strong>{" "}
                          {formatCurrency(payment.serviceFee)}
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 mb-2">
                          <strong>Amount to Host:</strong>{" "}
                          {formatCurrency(payment.amountToHost)}
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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
            <FaMoneyBillWave className="text-green-500" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-700">Total Revenue</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
            <FaUserTie className="text-blue-500" size={24} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-700">
              Total Amount to Hosts
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(totalAmountToHosts)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
