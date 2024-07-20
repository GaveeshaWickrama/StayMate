require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Logging HTTP requests
const mongoose = require("mongoose");
const path = require("path"); // Import the path module

const app = express();

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(morgan("dev"));
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");

mongoose.connect(process.env.DATABASE_URL); // Use 127.0.0.1 instead of localhost to fix conversion issues with IPV6
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/moderator", moderatorRoutes);
app.use("/properties", propertyRoutes);
app.use("/reservation", reservationRoutes);
app.use("/complaints", complaintRoutes);
app.use("/reviews", reviewRoutes);
app.use("/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
