import React from 'react';
import { Link } from 'react-router-dom';

const recentOrderData = [
    {
        id: '1',
        product_id: '4324',
        customer_id: '23143',
        customer_name: 'Shirley A.Lape',
        order_date: '2024-05-10',
        order_total: '$2000',
        current_order_status: 'PLACED',
    },
    {
        id: '2',
        product_id: '4325',
        customer_id: '23144',
        customer_name: 'John Doe',
        order_date: '2024-05-11',
        order_total: '$1500',
        current_order_status: 'SHIPPED',
    },
    {
        id: '3',
        product_id: '4326',
        customer_id: '23145',
        customer_name: 'Jane Smith',
        order_date: '2024-05-12',
        order_total: '$1800',
        current_order_status: 'DELIVERED',
    },
    {
        id: '4',
        product_id: '4327',
        customer_id: '23146',
        customer_name: 'Alice Brown',
        order_date: '2024-05-13',
        order_total: '$2200',
        current_order_status: 'CANCELLED',
    },
    {
        id: '5',
        product_id: '4328',
        customer_id: '23147',
        customer_name: 'Bob White',
        order_date: '2024-05-14',
        order_total: '$2500',
        current_order_status: 'RETURNED',
    },
];

function RecentOrders() {
    return (
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 shadow-md">
            <strong className="block text-gray-700 font-medium text-lg mb-2">Recent</strong>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200">ID</th>
                            <th className="py-2 px-4 border-b border-gray-200">Property ID</th>
                            <th className="py-2 px-4 border-b border-gray-200">User Name</th>
                            <th className="py-2 px-4 border-b border-gray-200">Booking Date</th>
                            <th className="py-2 px-4 border-b border-gray-200">Income</th>
                            <th className="py-2 px-4 border-b border-gray-200">Property Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrderData.map((order) => (
                            <tr key={order.id}>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Link to={`/order/${order.id}`} className="text-blue-500 hover:underline">#{order.id}</Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <Link to={`/product/${order.product_id}`} className="text-blue-500 hover:underline">#{order.product_id}</Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.customer_name}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{new Date(order.order_date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.order_total}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <span className={`px-2 py-1 inline-block rounded-lg text-sm ${getStatusColor(order.current_order_status)}`}>
                                        {order.current_order_status}
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

// Function to assign color based on order status
function getStatusColor(status) {
    switch (status) {
        case 'PLACED':
            return 'bg-blue-200 text-blue-800';
        case 'SHIPPED':
            return 'bg-green-200 text-green-800';
        case 'DELIVERED':
            return 'bg-teal-200 text-teal-800';
        case 'CANCELLED':
            return 'bg-red-200 text-red-800';
        case 'RETURNED':
            return 'bg-yellow-200 text-yellow-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
}

export default RecentOrders;
