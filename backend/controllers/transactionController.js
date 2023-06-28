const Transaction = require("../models/transactionModel");

// API to initialize the database with seed data
const initializeDatabase = async (req, res) => {
  try {
    // Fetch JSON from the third-party API
    // Initialize the database with seed data
    // Your implementation here

    res.status(200).json({ message: "Database initialized with seed data." });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize database." });
  }
};

// API to list all transactions with search and pagination support
const listTransactions = async (req, res) => {
  try {
    const { search, page, perPage } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { price: { $regex: search, $options: "i" } },
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};

module.exports = {
  initializeDatabase,
  listTransactions,
};
