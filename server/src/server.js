require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //  logging HTTP requests
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));



// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
