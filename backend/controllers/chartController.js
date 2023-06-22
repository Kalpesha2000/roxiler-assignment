const Transaction = require("../models/Transaction");

// API for bar chart
const getBarChartData = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(month);
  startDate.setDate(1);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
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

    const barChartData = [];

    for (const range of priceRanges) {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: startDate, $lt: endDate },
        price: { $gte: range.min, $lt: range.max },
      });

      barChartData.push({
        range: `${range.min}-${range.max}`,
        count,
      });
    }

    res.json(barChartData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching bar chart data" });
  }
};

// API for pie chart
const getPieChartData = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(month);
  startDate.setDate(1);
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
    const categories = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching pie chart data" });
  }
};

module.exports = {
  getBarChartData,
  getPieChartData,
};
