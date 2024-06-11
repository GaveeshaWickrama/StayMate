require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware


// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
