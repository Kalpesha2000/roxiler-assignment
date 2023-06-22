const express = require("express");
const connectDB = require("./utils/db");
const transactionRoutes = require("./routes/transactionRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const chartRoutes = require("./routes/chartRoutes");
const combinedRoutes = require("./routes/combinedRoutes");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/transactions", transactionRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/charts", chartRoutes);
app.use("/combined", combinedRoutes);
app.use(express.static("public"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
