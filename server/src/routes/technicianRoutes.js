const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');
const complaintController = require('../controllers/complaintController');

// Get all technicians
router.get('/all', technicianController.getAllTechnicians);

// Get technician by ID
router.get('/:id', technicianController.getTechnicianById);

// Get reviews
router.get('/reviews/:id', technicianController.getReviews);

// Complaint-related routes
router.get('/:id/noOfJobsCompleted/', complaintController.getNoOfJobsCompleted);
router.get('/:technicianID/jobs/', complaintController.getAllJobsByTechnicianId);
router.get('/:id/activeJobs/', complaintController.getActiveJobsByTechnicianId);
router.get('/:id/pendingJobs/', complaintController.getPendingJobsByTechnicianId);
router.get('/:id/completedJobs/', complaintController.getCompletedJobs);

module.exports = router;
