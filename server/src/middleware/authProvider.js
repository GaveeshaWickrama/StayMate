require('dotenv').config();
const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  

  

 
  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403); // Invalid token
    }

    // Add the decoded user to the request so that it can be used in your routes
    req.user = decoded;
    console.log('Decoded user:', req.user);
    next();
  });
}

function requireRole(...roles) {
  return (req, res, next) => {
    console.log(`User role: ${req.user?.role}`);
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      console.log(`Access denied. Required roles: ${roles.join(', ')}, but user role is ${req.user?.role}`);
      res.status(403).json({ message: `Access denied. Required roles: ${roles.join(', ')}` });
    }
  };
}

//const authToken = require('../middleware/authToken');


module.exports = {
  authToken,
  requireRole
};

