const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/business");
const categoryRoutes = require("./routes/category");
const packageRoutes = require("./routes/package");
const userRoutes = require("./routes/user");
const reportRoutes = require("./routes/report");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Security headers
const helmet = require("helmet");
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
