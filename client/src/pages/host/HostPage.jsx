import React from 'react';
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
        property_status: 'RETURNED',
    },
];

function RecentBookings() {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 shadow-md mt-8">
            <strong className="block text-gray-700 font-medium text-lg mb-2">Property Analysis</strong>
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
                        {recentBookingData.map((booking) => (
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

// Function to assign color based on booking status
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

function Analysis() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
            <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Paid Bookings</h3>
                    <BsFillArchiveFill className="text-2xl" />
                </div>
                <h1 className="text-3xl font-bold">1,074</h1>
            </div>
            <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Site Visit</h3>
                    <BsFillGrid3X3GapFill className="text-2xl" />
                </div>
                <h1 className="text-3xl font-bold">3,944</h1>
            </div>
            <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Searchers</h3>
                    <BsPeopleFill className="text-2xl" />
                </div>
                <h1 className="text-3xl font-bold">14,743</h1>
            </div>
            <div className="bg-white shadow-md p-5 rounded-md flex flex-col justify-around">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Total Monthly Income</h3>
                    <BsFillBellFill className="text-2xl" />
                </div>
                <h1 className="text-3xl font-bold">$6,766</h1>
            </div>
        </div>
    );
}

function HostPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <h1 className="text-4xl font-bold mb-4">Hello, Raveesha Wickrama!</h1>
            <Analysis />
            <RecentBookings />
        </div>
    );
}

export default HostPage;
