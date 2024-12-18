const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');
const complaintController = require('../controllers/complaintController');





// Complaint-related routes
router.get('/:technicianId/noOfJobsCompleted/', complaintController.getNoOfJobsCompleted);
router.get('/:technicianID/jobs/', complaintController.getAllJobsByTechnicianId);
router.get('/all/', technicianController.getAllTechnicians);
router.get('/:id/', technicianController.getTechnicianByIdC);
router.get('/:id/task-details', complaintController.getComplaintById);
router.post('/rate', technicianController.rateTechnician);
router.post('/rejectJob/:complaintId', complaintController.rejectJob);
router.post('/extendJob/:complaintId', complaintController.extendJob);
router.get('/reviews/:technicianId', technicianController.getReviews);
router.get('/:technicianId/activeJobs', complaintController.getActiveJobsByTechnicianId);

module.exports = router;
