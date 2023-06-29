const Transaction = require("../models/Transaction");

exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $regex: new RegExp(month, "i") },
    });
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, "i") },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: "$price" },
        },
      },
    ]);
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, "i") },
      sold: true,
    });
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, "i") },
      sold: false,
    });
    const barChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, "i") },
          sold: true,
        },
      },
      {
        $group: {
          _id: {
            $concat: [
              { $cond: [{ $lte: ["$price", 100] }, "0-100", ""] },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }],
                  },
                  "101-200",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }],
                  },
                  "201-300",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }],
                  },
                  "301-400",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }],
                  },
                  "401-500",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }],
                  },
                  "501-600",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }],
                  },
                  "601-700",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }],
                  },
                  "701-800",
                  "",
                ],
              },
              {
                $cond: [
                  {
                    $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }],
                  },
                  "801-900",
                  "",
                ],
              },
              { $cond: [{ $gt: ["$price", 900] }, "901-above", ""] },
            ],
          },
          count: { $sum: 1 },
        },
      },
    ]);
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, "i") },
          sold: true,
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      transactions,
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSaleAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
      barChartData,
      pieChartData,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
