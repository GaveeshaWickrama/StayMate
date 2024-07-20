require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const defaultImageMiddleware = require('./middleware/defaultImageMiddleware');

const app = express();

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

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");

mongoose.connect(process.env.DATABASE_URL);
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
