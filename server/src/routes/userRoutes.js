// In userController.js
const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const requireRole = require('../middleware/requireRole');
const userController = require('../controllers/userController'); // Import the user controller


//get the profile of a single user
router.get('/:id',authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.viewProfile)













//haven't used the below

//get all users
router.get('/',userController.getUsers)

//get a single user
router.get('/:id',userController.getUser)

//delete a user
router.delete('/:id',userController.deleteUser)

//update a user
router.patch('/:id',userController.updateUser)


// patch self user info (id stored in jwt token)
router.patch('/:id', authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.updateUser);

