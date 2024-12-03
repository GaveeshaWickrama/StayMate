const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");
// const taskController = require('../controllers/taskController');

const { authToken, requireRole } = require('../middleware/authProvider');
const upload = require('../middleware/multer'); // Import the upload configuration

// get self user info (id stored in jwt token)
/* router.get('/',authToken,requireRole('guest'), complaintController.raiseComplaint); */

router.post(
  "/raisecomplaint",
  authToken,
  requireRole("guest"),
  upload.array("photos"),
  complaintController.raiseComplaint
);
// router.post('/raisecomplaint', upload.array('images'), complaintController.raiseComplaint);
// router.post('/assign-complaint/:id', complaintController.assignComplaintToTechnician);
// router.post('/:id/assign-task', taskController.createTask);
router.get("/complaints", complaintController.hello);
router.get("/complaints/:id", complaintController.getComplaintsByHost);
// router.get('/active',
//     authToken,
//     requireRole("technician"),
// complaintController.getActiveJobs);
// router.get("/raiseComplaint", complaintController.raiseComplaint);
router.get("/:id/tasks", complaintController.getAllJobsByTechnicianId);
router.get(
  "/:id/pending/tech",
  complaintController.getPendingJobsByTechnicianId
);
// router.get(
//   "/:id/pending/host",
//   complaintController.getPendingComplaintsByHostId
// );
// router.get("/:id/active/host", complaintController.getActiveComplaintsByHostId);
router.get("/:id/completed", complaintController.getCompletedJobs);
router.post("/:id/confirmJob", complaintController.confirmJob);
router.get("/complaint-details/:complaintID", complaintController.getComplaintById);
router.get("/:id", complaintController.getComplaintsByHost);   //working
router.get("/:id/pending/host", complaintController.getPendingComplaintsByHost);   //working backend
router.post(
  "/assign-complaint/:technicianId",
  complaintController.assignComplaintToTechnician   //working
);
router.post("/complaint/:complaintId/review", complaintController.reviewTask);
router.post("/complaint/:complaintId/acceptJob", complaintController.acceptJob); //working
router.post("/complaint/:complaintId/resolve", complaintController.markAsResolved); 
router.post(
  "/complaint/:id/uploadProof",
  upload.array("images"),
  complaintController.uploadProof
);
router.get("/complaint/:complaintId/getProgress",complaintController.getProgress)
router.post("/complaint/:complaintId/setProgress",complaintController.setProgress)
router.post("/complaint/:complaintId/markJobCompleted",complaintController.markJobCompleted)


module.exports = router;
