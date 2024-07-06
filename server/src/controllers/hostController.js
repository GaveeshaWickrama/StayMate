// host.controller.js

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

// Controller function to fetch recent bookings
const getRecentBookings = (req, res) => {
    // For simplicity, just return the recent booking data
    res.json(recentBookingData);
};

module.exports = {
    getRecentBookings,
};
