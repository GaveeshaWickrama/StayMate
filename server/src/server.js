const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Logging HTTP requests
const mongoose = require("mongoose");
const path = require("path"); // Import the path module

// Correct path example

const app = express();


// Middleware
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Allow requests from the frontend origin
const allowedOrigins = ['http://localhost:5173'];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

}));


app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");
const taskRoutes = require("./routes/taskRoutes");
const technicianRoutes = require("./routes/technicianRoutes");

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

app.use("/message", messageRoutes);
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
