require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //  logging HTTP requests
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL) //use 127.0.0.1 insted of localhost to fix conversion issues with IPV6
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
