const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust as necessary

const Reservation = require('../models/reservationModel');
const Property = require('../models/propertyModel');

// book a property
router.post(
  "/add",
  authToken,
  requireRole("guest"),
  reservationController.addReservation
);
router.get(
  "/get",
  authToken,
  requireRole("guest", "host", "admin"),
  reservationController.getReservations
);

router.get('/reserved-dates/:propertyId/:sectionId', async (req, res) => {
  try {
    const { propertyId, sectionId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch reservations for the specified property and section within the date range
    const reservations = await Reservation.find({
      property: propertyId,
      sectionId: sectionId, // Filter by specific section ID
      $or: [
        { checkInDate: { $gte: start, $lte: end } },
        { checkOutDate: { $gte: start, $lte: end } },
        { checkInDate: { $lt: start }, checkOutDate: { $gt: end } },
      ],
    });

    // Initialize an array for the date range with all dates set to false (not fully booked)
    const bookedStatus = {};
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      bookedStatus[dateString] = 0;
    }

    // Populate the bookedStatus array with counts of how many units are booked on each date
    reservations.forEach((reservation) => {
      const { checkInDate, checkOutDate } = reservation;

      for (
        let date = new Date(checkInDate);
        date <= checkOutDate;
        date.setDate(date.getDate() + 1)
      ) {
        const dateString = date.toISOString().split('T')[0];

        if (dateString in bookedStatus) {
          bookedStatus[dateString]++;
        }
      }
    });

    const property = await Property.findById(propertyId);
    const section = property.sections.id(sectionId); // Get the specific section details
    let sectionCount = section ? section.count : 1; // Default to 1 if no count is specified

    // Check if the property is listed as a whole
    if (property.total_unique_sections === -1) {
      sectionCount = 1; // Treat the entire property as a single unit
    }

    // Determine if each date is fully booked based on the section's total count
    const dates = Object.keys(bookedStatus).map(date => ({
      date,
      booked: bookedStatus[date] >= sectionCount
    }));
    console.log({ dates });
    res.status(200).json({ dates });
  } catch (error) {
    console.error('Error fetching reserved dates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
