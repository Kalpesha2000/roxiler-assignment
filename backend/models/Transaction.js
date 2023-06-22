const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
  productTitle: String,
  productDescription: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  isSold: Boolean,
});

module.exports = mongoose.model('Transaction', transactionSchema);
