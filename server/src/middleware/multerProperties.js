const multer = require('multer');
const path = require('path');

const propertyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === 'deed' ? 'uploads/deeds/' : 'uploads/properties/';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploadPropertyImages = multer({ storage: propertyStorage }).fields([
  { name: 'images', maxCount: 10 },
  { name: 'section_images', maxCount: 50 },
  { name: 'amenity_images', maxCount: 50 }, // Add this line to handle amenity images
  { name: 'deed', maxCount: 1 }
]);


module.exports = uploadPropertyImages;



//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 

//DO NOT TOUCH THIS FILE 
