const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const transactionRoutes = require("./routes/transactionRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const barChartRoutes = require("./routes/barChartRoutes");
const combinedDataRoutes = require("./routes/combinedDataRoutes");

app.use("/transactions", transactionRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/barchart", barChartRoutes);
app.use("/combineddata", combinedDataRoutes);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
