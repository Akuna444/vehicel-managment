// src/app.js
const express = require("express");
const connectDB = require("./config/db");

const vehicleRoutes = require("./routes/vehicleRoutes");
const authRoutes = require("./routes/authRoutes");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/vehicle", vehicleRoutes);
app.use("/api/v1/auth", authRoutes);

connectDB();

module.exports = app;
