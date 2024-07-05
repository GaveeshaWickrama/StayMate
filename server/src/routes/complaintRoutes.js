const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const taskController = require('../controllers/taskController');
// const { authToken, requireRole } = require('../middleware/authProvider');
const upload = require('../middleware/multer'); // Import the upload configuration

// get self user info (id stored in jwt token)
/* router.get('/',authToken,requireRole('guest'), complaintController.raiseComplaint); */

// router.post('/raisecomplaint',authToken,requireRole('guest'), upload.array('photos'), complaintController.raiseComplaint);
router.post('/raisecomplaint', upload.array('images'), complaintController.raiseComplaint);
router.post('/:id/assign-task', taskController.createTask);



module.exports = router;