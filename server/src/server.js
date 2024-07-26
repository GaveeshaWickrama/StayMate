const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const defaultImageMiddleware = require("./middleware/defaultImageMiddleware");
const path = require("path");
const { updateReservationStatuses } = require("./controllers/reservationController");
const cron = require("node-cron");

const app = express();

// Middleware to serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Call updateReservationStatuses on server startup
updateReservationStatuses();

// Schedule periodic status update task to run every hour
setInterval(() => {
  console.log("Running periodic reservation status update job...");
  updateReservationStatuses();
}, 60 * 60 * 1000); // Every hour

// Use custom middleware to serve default images if the requested image is not found
app.use(
  "/uploads/profilepictures",
  defaultImageMiddleware("profilepictures", "default.jpg")
);
app.use(
  "/uploads/properties",
  defaultImageMiddleware("properties", "default.jpg")
);

// Allow any origin
app.use(
  cors({
    origin: '*',
  })
);

app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body));

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
const taskRoutes = require("./routes/taskRoutes");
const technicianRoutes = require("./routes/technicianRoutes");

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use("/tasks", taskRoutes);
app.use("/technicians", technicianRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
