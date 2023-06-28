const Transaction = require("../models/transactionModel");

// API for bar chart
const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const chartData = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $month: new Date(month) },
        price: { $gte: range.min, $lte: range.max },
      });

      chartData.push({ range: `${range.min} - ${range.max}`, count });
    }

    res.status(200).json({ chartData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bar chart data." });
  }
};

module.exports = {
  getBarChartData,
};
