const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const db = require("./db");
require("dotenv").config();

const app = express();

// DB
db();

// Import routes
const authRoutes = require("./routes/auth");

// apply middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL })); // used by cors to allow access

// Middleware - pieces of code that run in the middle
app.use("/api", authRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`API running on port ${port}`));