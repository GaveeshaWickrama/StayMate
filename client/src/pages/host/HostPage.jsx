import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { useAuth } from "../../context/auth";

// Function to get status color based on property status
function getStatusColor(status) {
    switch (status) {
        case 'BOOKED':
            return 'bg-blue-200 text-blue-800';
        case 'AVAILABLE':
            return 'bg-green-200 text-green-800';
        case 'CANCELLED':
            return 'bg-red-200 text-red-800';
        case 'PENDING':
            return 'bg-yellow-200 text-yellow-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
}

// RecentBookings Component
function RecentBookings() {
    const { token } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [recentBookingData, setRecentBookingData] = useState([]);

    // Fetch recent bookings from backend
    useEffect(() => {
        const fetchRecentBookings = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/bookings/recent`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRecentBookingData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching recent bookings:', error);
            }
        };

        fetchRecentBookings();
    }, [token]);

    // Handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterData(event.target.value);
    };

    // Filter data based on search term
    const filterData = (term) => {
        if (!term) {
            setFilteredData(recentBookingData);
        } else {
            const filtered = recentBookingData.filter((booking) =>
                Object.values(booking).some((value) =>
                    value.toString().toLowerCase().includes(term.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    };

    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 shadow-md mt-8">
            <strong className="block text-gray-700 font-medium text-lg mb-2">Property Analysis</strong>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 p-2 rounded-md focus:outline-none w-1/3"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300">ID</th>
                            <th className="py-2 px-4 border-b border-gray-300">Property ID</th>
                            <th className="py-2 px-4 border-b border-gray-300">User Name</th>
                            <th className="py-2 px-4 border-b border-gray-300">Booking Date</th>
                            <th className="py-2 px-4 border-b border-gray-300">Income</th>
                            <th className="py-2 px-4 border-b border-gray-300">Property Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <Link to={`/booking/${booking.id}`} className="text-blue-500 hover:underline">#{booking.id}</Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <Link to={`/property/${booking.property_id}`} className="text-blue-500 hover:underline">#{booking.property_id}</Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.user_name}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{booking.income}</td>
                                <td className="py-2 px-4 border-b border-gray-300">
                                    <span className={`px-2 py-1 inline-block rounded-lg text-sm ${getStatusColor(booking.property_status)}`}>
                                        {booking.property_status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Analysis Component
const Analysis = () => {
    const { token } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState('This Month');
    const [incomeData, setIncomeData] = useState(null);
    const [totalBookings, setTotalBookings] = useState(0);
    const [totalProperties, setTotalProperties] = useState(0);

    // Fetch data for analysis from backend
    useEffect(() => {
        const fetchTotalMonthlyIncome = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/total-income`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const monthlyIncome = response.data.find(income => income._id === new Date().getMonth() + 1);
                setIncomeData(monthlyIncome ? monthlyIncome.totalIncome : 0);
            } catch (error) {
                console.error('Error fetching total monthly income:', error);
            }
        };

        const fetchTotalBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/total-bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTotalBookings(response.data.totalBookings);
            } catch (error) {
                console.error('Error fetching total bookings:', error);
            }
        };

        const fetchTotalProperties = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/properties/total-properties`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTotalProperties(response.data.totalProperties);
            } catch (error) {
                console.error('Error fetching total properties:', error);
            }
        };

        fetchTotalMonthlyIncome();
        fetchTotalBookings();
        fetchTotalProperties();
    }, [token]);

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-8">
            <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-md">
                <h2 className="text-lg font-medium text-gray-700">Monthly Income</h2>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-3xl font-bold text-green-500">${incomeData ? incomeData.toFixed(2) : '0.00'}</p>
                    <select
                        className="border border-gray-300 rounded-md p-2"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                        <option value="This Month">This Month</option>
                        <option value="Last Month">Last Month</option>
                        <option value="This Year">This Year</option>
                    </select>
                </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-md">
                <h2 className="text-lg font-medium text-gray-700">Total Bookings</h2>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-3xl font-bold text-blue-500">{totalBookings}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-gray-200 shadow-md">
                <h2 className="text-lg font-medium text-gray-700">Total Properties</h2>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-3xl font-bold text-purple-500">{totalProperties}</p>
                </div>
            </div>
        </div>
    );
};

// HostPage Component
function HostPage() {
    return (
        <div className="p-4">
            <header className="bg-white p-10 rounded-sm border border-gray-200 shadow-md">
                <h1 className="text-4xl font-bold text-gray-700">Hello! Harry Potter</h1>
            </header>
            <div className="mt-8">
                <Analysis />
                <RecentBookings />
            </div>
        </div>
    );
}

export default HostPage;
