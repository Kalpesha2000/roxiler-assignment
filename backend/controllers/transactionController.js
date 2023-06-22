const Transaction = require('../models/Transaction');

// API to list all transactions
const getAllTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;
  const query = {
    $or: [
      { productTitle: { $regex: search, $options: 'i' } },
      { productDescription: { $regex: search, $options: 'i' } },
      { price: { $regex: search, $options: 'i' } },
    ],
  };

  try {
    const totalCount = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({
      totalCount,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions' });
  }
};

module.exports = {
  getAllTransactions,
};
