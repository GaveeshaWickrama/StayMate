const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');
const complaintController = require('../controllers/complaintController');



// Get reviews
router.get('/reviews/:id', technicianController.getReviews);

// Complaint-related routes
router.get('/:id/noOfJobsCompleted/', complaintController.getNoOfJobsCompleted);
router.get('/:technicianID/jobs/', complaintController.getAllJobsByTechnicianId);
router.get('/:id/activeJobs/', complaintController.getActiveJobsByTechnicianId);
router.get('/:id/pendingJobs/', complaintController.getPendingJobsByTechnicianId);
router.get('/:id/completedJobs/', complaintController.getCompletedJobs);
router.get('/all/', technicianController.getAllTechnicians);
router.get('/:id/', technicianController.getTechnicianByIdC);

module.exports = router;
