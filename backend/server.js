const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Enable CORS for static images with proper headers
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
}, express.static(path.join(__dirname, "public", "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api", require("./routes/categoryRoute"));
app.use("/api", require("./routes/productRoutes"));
app.use("/api", require("./routes/cartRoutes"));
app.use("/api", require("./routes/orderRoutes"));
app.use("/api", require("./routes/reviewRoutes"));

// MongoDB connection
// import mongoose from "mongoose";
// import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
