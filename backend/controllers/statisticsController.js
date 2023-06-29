const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  
  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: '$price' }
        }
      }
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      sold: true
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      sold: false
    });

    res.json({
      totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalSaleAmount : 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
