const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'uploads/';

    if(req.url.includes('/raisecomplaint')) {
      cb(null, 'uploads/complaints');
    }
    else if(req.url.includes('/add')) {
      cb(null, 'uploads/properties/');
    }
    else if(req.url.includes('/editProfile')) {//these are backend URLs
      uploadPath = 'uploads/profilepictures/';
    }

    cb(null, uploadPath);

    // else {
    //   cb(null, 'uploads/');
    // }
    
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize multer
const upload = multer({ storage: storage });

module.exports = upload;