const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const defaultImageMiddleware = require('./middleware/defaultImageMiddleware'); // Adjust the path as necessary

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use custom middleware to serve default images if the requested image is not found
app.use('/uploads/profilepictures', defaultImageMiddleware('profilepictures', 'default.jpg'));
app.use('/uploads/properties', defaultImageMiddleware('properties', 'default.jpg'));

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Import the bookingRoutes
const bookingRoutes = require('./routes/hostRoutes');

app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
