const path = require('path');
const fs = require('fs');

const defaultImageMiddleware = (directory, defaultFileName) => {
  return (req, res, next) => {
    const requestedImage = path.join(__dirname, `../../uploads/${directory}`, req.url);
    const defaultImage = path.join(__dirname, `../../uploads/${directory}/${defaultFileName}`);

    fs.access(requestedImage, fs.constants.F_OK, (err) => {
      if (err) {
        // If the requested image does not exist, serve the default image
        res.sendFile(defaultImage);
      } else {
        // If the requested image exists, continue to the next middleware
        next();
      }
    });
  };
};

module.exports = defaultImageMiddleware;
