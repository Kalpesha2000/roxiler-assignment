const express = require('express');
const transactionController = require('../controllers/transactionController');
const paginationMiddleware = require('../middlewares/paginationMiddleware');

const router = express.Router();

// Route for listing all transactions
router.get('/', paginationMiddleware, transactionController.getAllTransactions);

module.exports = router;
