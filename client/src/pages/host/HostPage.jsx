import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

const recentBookingData = [
    {
        id: '1',
        property_id: '4324',
        user_name: 'Shirley A.Lape',
        booking_date: '2024-05-10',
        income: '$2000',
        property_status: 'BOOKED',
    },
    {
        id: '2',
        property_id: '4325',
        user_name: 'John Doe',
        booking_date: '2024-05-11',
        income: '$1500',
        property_status: 'AVAILABLE',
    },
    {
        id: '3',
        property_id: '4326',
        user_name: 'Jane Smith',
        booking_date: '2024-05-12',
        income: '$1800',
        property_status: 'BOOKED',
    },
    {
        id: '4',
        property_id: '4327',
        user_name: 'Alice Brown',
        booking_date: '2024-05-13',
        income: '$2200',
        property_status: 'CANCELLED',
    },
    {
        id: '5',
        property_id: '4328',
        user_name: 'Bob White',
        booking_date: '2024-05-14',
        income: '$2500',
        property_status: 'P',
    },
];

function RecentBookings() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(recentBookingData);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        filterData(event.target.value);
    };

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
                {/* You can add more filters here if needed */}
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

function getStatusColor(status) {
    switch (status) {
        case 'BOOKED':
            return 'bg-blue-200 text-blue-800';
        case 'AVAILABLE':
            return 'bg-green-200 text-green-800';
        case 'CANCELLED':
            return 'bg-red-200 text-red-800';
        case 'RETURNED':
            return 'bg-yellow-200 text-yellow-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
}

const Analysis = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('This Month'); // State to manage selected period

    // Dummy data for total monthly income for different periods
    const incomeData = {
        'This Month': '$6,766',
        'Last Month': '$7,200',
        'Last 3 Months': '$20,500',
        'Last 6 Months': '$42,300',
    };

    // Function to handle dropdown change
    const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
            <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around items-center border-l-4 border-blue-500">
                <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-lg font-medium">Paid Bookings</h3>
                    <BsFillArchiveFill className="text-2xl text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-center">1,074</h1>
            </div>
            <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around items-center border-l-4 border-blue-500">
                <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-lg font-medium">Site Visit</h3>
                    <BsFillGrid3X3GapFill className="text-2xl text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-center">3,944</h1>
            </div>
            <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around items-center border-l-4 border-blue-500">
                <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-lg font-medium">Searchers</h3>
                    <BsPeopleFill className="text-2xl text-blue-500" />
                </div>
                <h1 className="text-2xl font-bold text-center">14,743</h1>
            </div>
            <div className="bg-white shadow-md p-3 rounded-md flex flex-col justify-around items-center border-l-4 border-blue-500">
                <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-lg font-medium">Total Monthly Income</h3>
                    <BsFillBellFill className="text-2xl text-blue-500" />
                </div>
                <div className="flex items-center justify-center mb-2">
                    <select
                        className="border border-gray-300 p-2 rounded-md focus:outline-none"
                        value={selectedPeriod}
                        onChange={handlePeriodChange}
                    >
                        {Object.keys(incomeData).map((period) => (
                            <option key={period} value={period}>
                                {period}
                            </option>
                        ))}
                    </select>
                </div>
                <h1 className="text-2xl font-bold text-center">{incomeData[selectedPeriod]}</h1>
            </div>
        </div>
    );
};

function HostPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="bg-blue-100 rounded-md p-4 mb-4">
                <h1 className="text-4xl font-bold">Hello, Raveesha Wickrama!</h1>
            </div>
            <Analysis />
            <RecentBookings />
        </div>
    );
}

export default HostPage;
