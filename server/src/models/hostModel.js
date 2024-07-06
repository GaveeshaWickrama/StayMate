// host.model.js

// Model schema for recent bookings (if needed)
// For simplicity, we might not need a separate model for this example
const recentBookingSchema = {
    id: String,
    property_id: String,
    user_name: String,
    booking_date: Date,
    income: String,
    property_status: String,
};

module.exports = {
    recentBookingSchema,
};
