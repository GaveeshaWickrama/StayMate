const multer = require('multer');
const path = require('path');

const propertyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/properties/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadPropertyImages = multer({ storage: propertyStorage }).fields([
  { name: 'images', maxCount: 10 },
  { name: 'section_images', maxCount: 50 }
]);

module.exports = uploadPropertyImages;



//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 
