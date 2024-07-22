// host.controller.js
const Booking = require('../models/hostModel');


// Fetch recent bookings
exports.getRecentBookings = async (req, res) => {
    try {
        const recentBookings = await Booking.find().sort({ booking_date: -1 }).limit(10);
        res.json(recentBookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recent bookings', error });
    }
};

// Fetch total monthly income
exports.getTotalMonthlyIncome = async (req, res) => {
    try {
        const totalIncome = await Booking.aggregate([
            {
                $group: {
                    _id: { $month: "$booking_date" },
                    totalIncome: { $sum: { $toDouble: "$income" } },
                },
            },
            { $sort: { _id: -1 } },
        ]);
        res.json(totalIncome);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total monthly income', error });
    }
};

// Fetch total properties
exports.getTotalProperties = async (req, res) => {
    try {
        const totalProperties = await Property.countDocuments();
        res.json({ totalProperties });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total properties', error });
    }
};
