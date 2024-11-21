const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');
const complaintController = require('../controllers/complaintController');



// Get reviews
router.get('/reviews/:id', technicianController.getReviews);

// Complaint-related routes
router.get('/:id/noOfJobsCompleted/', complaintController.getNoOfJobsCompleted);
router.get('/:technicianID/jobs/', complaintController.getAllJobsByTechnicianId);
router.get('/all/', technicianController.getAllTechnicians);
router.get('/:id/', technicianController.getTechnicianByIdC);
router.get('/:id/task-details', complaintController.getComplaintById);
router.post('/rate', technicianController.rateTechnician);
router.get('/reviews/:technicianId', technicianController.getReviews);

module.exports = router;
