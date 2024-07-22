// host.model.js

// Model schema for recent bookings (if needed)
// For simplicity, we might not need a separate model for this example

// Define the schema for recent bookings
const mongoose = require('mongoose');

const recentBookingSchema = new mongoose.Schema({
    id: String,
    property_id: String,
    user_name: String,
    booking_date: Date,
    income: String,
    property_status: String,
});

const Booking = mongoose.model('Booking', recentBookingSchema);

module.exports = Booking;
