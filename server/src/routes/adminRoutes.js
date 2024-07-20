const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authToken, requireRole } = require('../middleware/authProvider');

//get all moderators
router.get('/moderators', authToken, requireRole('admin'), adminController.getModerators);

//create a new moderator
router.post('/moderators', authToken, requireRole('admin'), adminController.createModerator);

// get all users 
router.get('/users', authToken, requireRole('admin'), adminController.getAllUsers); 



// create a user 
router.post('/users', authToken, requireRole('admin'), adminController.createUser);

// get single user 
router.get('/users/:id', authToken, requireRole('admin'), adminController.getUser);
router.get('/view-technicians/', authToken, requireRole('admin'), adminController.getUser);

//get details for admin dashboard-------------------------------------
//router.get('/admin/dashboard', authToken, requireRole('admin'), adminController.getAdminDashboard);

// update single user 
router.patch('/users/:id', authToken, requireRole('admin'), adminController.updateUser);

// delete single user 
router.delete('/users/:id', authToken, requireRole('admin'), adminController.deleteUser);
//get monthly income
//router.get('/monthly-income', adminController.getMonthlyIncome);




//get profile details
router.get('/viewProfile', authToken, requireRole('admin'), adminController.viewProfile);

//update profile details
router.put('/viewProfile', authToken, requireRole('admin'), adminController.updateProfile);



module.exports = router;
