const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
// const taskController = require('../controllers/taskController');
// const { authToken, requireRole } = require('../middleware/authProvider');
const upload = require('../middleware/multer'); // Import the upload configuration
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust as necessary





// get self user info (id stored in jwt token)
/* router.get('/',authToken,requireRole('guest'), complaintController.raiseComplaint); */

// router.post('/raisecomplaint',authToken,requireRole('guest'), upload.array('photos'), complaintController.raiseComplaint);
// router.post('/raisecomplaint', upload.array('images'), complaintController.raiseComplaint);
// router.post('/assign-complaint/:id', complaintController.assignComplaintToTechnician);
// router.post('/:id/assign-task', taskController.createTask);
router.get('/complaints',complaintController.hello);
// router.get('/active',
//     authToken,
//     requireRole("technician"),
// complaintController.getActiveJobs);
router.get('/raiseComplaint',complaintController.raiseComplaint);
router.get('/:id/tasks',complaintController.getAllJobsByTechnicianId);
// router.get('/:id/active/tech',complaintController.getActiveJobsByTechnicianId);
router.get('/:id/pending/tech',complaintController.getPendingJobsByTechnicianId);
router.get('/:id/pending/host',complaintController.getPendingComplaintsByHostId);
router.get('/:id/active/host',complaintController.getActiveComplaintsByHostId);
router.get('/:id/completed',complaintController.getCompletedJobs);
router.get('/complaint-details/:id',complaintController.getComplaintById);
router.get('/:id',complaintController.getAllComplaintsByHostId);
router.post('/assign-complaint/:id', complaintController.assignComplaintToTechnician);
router.post('/complaint/:id/review', complaintController.reviewTask);
router.post('/complaint/:id/acceptJob', complaintController.acceptJob);
router.post('/complaint/:id/uploadProof',upload.array('proofImages',5), complaintController.uploadProof);



module.exports = router;