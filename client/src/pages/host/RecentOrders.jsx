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
        <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Recent Orders</strong>
            <div className="mt-3">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Property ID</th>
                            <th>Customer Name</th>
                            <th>Booking Date</th>
                            <th>income Total</th>
                            <th>Property Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrderData.map((order) => (
                            <tr key={order.id}>
                                <td>
                                    <Link to={`/order/${order.id}`}>#{order.id}</Link>
                                </td>
                                <td>
                                    <Link to={`/product/${order.product_id}`}>#{order.product_id}</Link>
                                </td>
                                <td>
                                    <Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link>
                                </td>
                                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td>{order.order_total}</td>
                                <td>{order.current_order_status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentOrders;
