const Transaction = require("../models/transactionModel");

// API for statistics
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Calculate total sale amount of selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $month: new Date(month) },
          isSold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);

    // Calculate total number of sold items of selected month
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $month: new Date(month) },
      isSold: true,
    });

    // Calculate total number of not sold items of selected month
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $month: new Date(month) },
      isSold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalSaleAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statistics." });
  }
};

module.exports = {
  getStatistics,
};
