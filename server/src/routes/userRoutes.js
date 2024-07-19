const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authToken, requireRole } = require('../middleware/authProvider');


//get the profile of a single user
router.get('/',authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.viewProfile)

//update profile
router.patch('/editProfile/',authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'),userController.editProfile)












//haven't used the below

//get all users
router.get('/',authToken, requireRole('admin'),userController.getUsers)

//get a single user
router.get('/:id',authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'),userController.getUser)

//delete a user
router.delete('/:id',userController.deleteUser)



// // patch self user info (id stored in jwt token)
// router.patch('/:id', authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.updateUser);

module.exports = router;
