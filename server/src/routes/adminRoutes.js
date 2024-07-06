const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authToken, requireRole } = require('../middleware/authProvider');

// get all users 
router.get('/users', authToken, requireRole('admin'), adminController.getAllUsers); 



// create a user 
router.post('/users', authToken, requireRole('admin'), adminController.createUser);

// get single user 
router.get('/users/:id', authToken, requireRole('admin'), adminController.getUser);

//get details for admin dashboard-------------------------------------
//router.get('/admin/dashboard', authToken, requireRole('admin'), adminController.getAdminDashboard);

// update single user 
router.patch('/users/:id', authToken, requireRole('admin'), adminController.updateUser);

// delete single user 
router.delete('/users/:id', authToken, requireRole('admin'), adminController.deleteUser);



module.exports = router;
