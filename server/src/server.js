require("dotenv").config();
require('./sheduler.js');  // Import the scheduler so it runs when the server starts
const { app,server } = require("./socket/socket.js");
const cors = require("cors");
const morgan = require("morgan"); // Logging HTTP requests
const mongoose = require("mongoose");
const path = require("path"); // Import the path module
const defaultImageMiddleware = require('./middleware/defaultImageMiddleware'); // Adjust the path as necessary
const express = require('express');



// Middleware to serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Use custom middleware to serve default images if the requested image is not found
app.use("/uploads/profilepictures", defaultImageMiddleware('profilepictures', 'default.jpg'));
app.use("/uploads/properties", defaultImageMiddleware('properties', 'default.jpg'));

app.use(cors());
app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// Define routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");
const technicianRoutes = require("./routes/technicianRoutes");

mongoose.connect(process.env.DATABASE_URL); // Use 127.0.0.1 instead of localhost to fix conversion issues with IPV6
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Middleware to parse JSON requests
app.use(express.json());

// Use routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/moderator", moderatorRoutes);
app.use("/properties", propertyRoutes);
app.use("/reservation", reservationRoutes);
app.use("/complaints", complaintRoutes);
app.use("/reviews", reviewRoutes);
app.use("/message", messageRoutes);
app.use("/technicians", technicianRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});