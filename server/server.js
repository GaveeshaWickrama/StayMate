const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Logging HTTP requests
const mongoose = require("mongoose");
const path = require('path'); // Import the path module

// Correct path example

const app = express();

// Middleware
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors());
app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const propertyRoutes = require("./src/routes/propertyRoutes");
const reservationRoutes = require("./src/routes/reservationRoutes");
const complaintRoutes = require("./src/routes/complaintRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const technicianRoutes = require("./src/routes/technicianRoutes");


mongoose.connect(process.env.DATABASE_URL); // Use 127.0.0.1 instead of localhost to fix conversion issues with IPV6
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/properties", propertyRoutes);
app.use("/reservation", reservationRoutes);
app.use("/complaints", complaintRoutes);
app.use("/reviews", reviewRoutes);
app.use("/tasks", taskRoutes);
app.use("/technicians", technicianRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
