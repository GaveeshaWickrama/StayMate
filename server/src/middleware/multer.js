const { ifError } = require('assert');
const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    if (req.url.includes('/raisecomplaint')) {
      uploadPath = 'uploads/complaints/';
    } else if (req.url.includes('/add')) {
      uploadPath = 'uploads/properties/';
    } else if (req.url.includes('/editProfile')) {
      uploadPath = 'uploads/profilepictures/';
    } else if (req.url.includes('/uploadProof')) {
      uploadPath = 'uploads/taskProof/';
    } else if (req.url.includes('/complaint-details')) {
      uploadPath = 'uploads/complaints/';
    } 
   

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer
const upload = multer({ storage: storage });

module.exports = upload;
