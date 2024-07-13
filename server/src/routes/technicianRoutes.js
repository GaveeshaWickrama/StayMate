const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const upload = require('../middleware/multer'); // Import multer middleware
const technicianController = require('../controllers/technicianController')
// const { authToken, requireRole } = require('../middleware/authProvider');



// Create a new property (accessible by hosts and admins)
// router.post('/assign-task', authToken, requireRole('host', 'admin'), upload.array('images', 10), taskController.createTask);

// router.get('/all', authToken, requireRole('technician', 'admin'), taskController.getAllTasks);

// router.post('/:id/assign-task', taskController.createTask);


// router.post('/register', technicianController.createTechnician);

router.get('/all', technicianController.getAllTechnicians);
router.get('/:id', technicianController.getTechnicianById);




// router.get('/all', taskController.getAllTasks);
// router.get('/:id', taskController.getTaskById);
// router.get('/active',taskController.getActiveTasks);
// router.get('/pending', taskController.getPendingTasks);


// router.get('/host-properties', authToken, requireRole('host', 'admin'), propertyController.getPropertiesByHostId);
// Get property by ID



module.exports = router;


