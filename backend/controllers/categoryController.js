const Transaction = require('../models/transactionModel');

// API for pie chart
const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    const categoryData = await Transaction.aggregate([
      {
        $match: { dateOfSale: { $month: new Date(month) } },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ categoryData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pie chart data.' });
  }
};

module.exports = {
  getPieChartData,
};
