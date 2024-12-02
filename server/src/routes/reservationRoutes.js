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

    // Validate query parameters
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid start date or end date' });
    }

    if (start > end) {
      return res.status(400).json({ message: 'Start date cannot be after end date' });
    }

    // Fetch the property
    const property = await Property.findById(propertyId);

    if (!property) {
      console.error(`Property not found: ${propertyId}`);
      return res.status(404).json({ message: 'Property not found' });
    }

    // Explicitly match section_id instead of using .id()
    const section = property.sections.find(
      (sec) => sec.section_id.toString() === sectionId
    );

    if (!section) {
      console.error(`Section not found in property ${propertyId}: ${sectionId}`);
      return res.status(404).json({ message: 'Section not found' });
    }

    // Fetch reservations for the specified property and section within the date range
    const reservations = await Reservation.find({
      property: propertyId,
      sectionId: sectionId,
      $or: [
        { checkInDate: { $gte: start, $lte: end } },
        { checkOutDate: { $gte: start, $lte: end } },
        { checkInDate: { $lt: start }, checkOutDate: { $gt: end } },
      ],
    });

    const bookedStatus = {};
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      bookedStatus[dateString] = 0;
    }

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

    const sectionCount = section.count;
    const dates = Object.keys(bookedStatus).map((date) => ({
      date,
      booked: bookedStatus[date] >= sectionCount,
      status: `${bookedStatus[date]}/${sectionCount}`,
    }));

    res.status(200).json({ dates });
  } catch (error) {
    console.error('Error fetching reserved dates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
